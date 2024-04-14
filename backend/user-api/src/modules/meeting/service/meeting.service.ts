import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Address, Meeting } from '../entity/meeting.entity';
import {
  MeetingAcceptInput,
  MeetingCancelInput,
  MeetingProposeInput,
} from '../entity/meeting.input';
import { Match } from '../../match/entity/match.entity';
import { AuthUser } from '../../auth/entity/authUser.entity';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { getPartner, getUser } from '../../../utils/match.utils';
import { MessagingService } from '../../firebase/service/messaging.service';

@Injectable()
export class MeetingService {
  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
    @InjectRepository(Meeting)
    private readonly meetingRepository: Repository<Meeting>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly messagingService: MessagingService,
  ) {
    // this.accept({ id: 2 }, { matchId: 363 });
  }

  async propose(authUser: AuthUser, input: MeetingProposeInput) {
    const match = await this.findOneMatchWithUsers(input.matchId);
    let meeting = match.meeting;

    if (!meeting) {
      meeting = this.meetingRepository.create();
      await this.meetingRepository.save(meeting);

      match.meeting = meeting;
      await this.matchRepository.save(match);
    }

    let address: Address | null;

    if (match.fromUser.id === authUser.id) {
      address = meeting.fromUserAddress;
    } else {
      address = meeting.toUserAddress;
    }

    const isAddressNew = !address;

    if (isAddressNew) {
      address = this.addressRepository.create();

      if (match.fromUser.id === authUser.id) {
        meeting.fromUserAddress = address;
      } else {
        meeting.toUserAddress = address;
      }
    }

    address.placeId = input.placeId;
    address.time = input.time;

    const {
      address_components,
      geometry: {
        location: { lat, lng },
      },
    } = await this.getAddressDetails(input.placeId);

    address.lat = lat;
    address.lng = lng;

    const streetName = address_components.find((value) =>
      value.types.includes('route'),
    )?.short_name;
    const streetNumber = address_components.find((value) =>
      value.types.includes('street_number'),
    )?.short_name;

    address.placeLabel = `${streetName}, ${streetNumber}`;

    if (isAddressNew) {
      await this.addressRepository.save(address);
      await this.meetingRepository.save(meeting);
    } else {
      await this.addressRepository.save(address);
    }

    meeting.match = match;

    this.notify(match, 'MEETING_PROPOSE', authUser);

    return meeting;
  }

  async accept(authUser: AuthUser, input: MeetingAcceptInput) {
    const match = await this.findOneMatchWithUsers(input.matchId);

    // deal with mmeets
    match.fromUser.availableMeetings -= 1;
    await this.userRepository.save(match.fromUser);
    match.toUser.availableMeetings -= 1;
    await this.userRepository.save(match.toUser);

    // remove from, to address, move accepted address to accepted field
    const meeting = match.meeting;
    let acceptedAddress: Address;

    if (match.fromUser.id === authUser.id) {
      acceptedAddress = meeting.toUserAddress;
    } else {
      acceptedAddress = meeting.fromUserAddress;
    }

    const address = this.addressRepository.create();
    Object.assign(address, acceptedAddress);
    address.id = undefined;
    await this.addressRepository.save(address);

    const fromUserAddress = meeting.fromUserAddress;
    const toUserAddress = meeting.toUserAddress;

    meeting.fromUserAddress = null;
    meeting.toUserAddress = null;
    meeting.acceptedAddress = address;

    await this.meetingRepository.save(meeting);

    const addressesToRemove = [];
    fromUserAddress && addressesToRemove.push(fromUserAddress);
    toUserAddress && addressesToRemove.push(toUserAddress);

    await this.addressRepository.remove(addressesToRemove);

    meeting.match = match;

    this.notify(match, 'MEETING_ACCEPT', authUser);

    return meeting;
  }

  async cancel(authUser: AuthUser, input: MeetingCancelInput) {
    const match = await this.findOneMatchWithUsers(input.matchId);

    // deal with mmeets
    match.fromUser.availableMeetings += 1;
    await this.userRepository.save(match.fromUser);
    match.toUser.availableMeetings += 1;
    await this.userRepository.save(match.toUser);

    const meeting = match.meeting;

    const fromUserAddress = meeting.fromUserAddress;
    const toUserAddress = meeting.toUserAddress;
    const acceptedAddress = meeting.acceptedAddress;

    meeting.fromUserAddress = null;
    meeting.toUserAddress = null;
    meeting.acceptedAddress = null;

    await this.meetingRepository.save(meeting);

    const addressesToRemove = [];
    fromUserAddress && addressesToRemove.push(fromUserAddress);
    toUserAddress && addressesToRemove.push(toUserAddress);
    acceptedAddress && addressesToRemove.push(acceptedAddress);

    await this.addressRepository.remove(addressesToRemove);

    meeting.match = match;

    this.notify(match, 'MEETING_CANCEL', authUser);

    return meeting;
  }

  private notify(match: Match, type: string, authUser: AuthUser) {
    const partner = getPartner(match, authUser);

    this.messagingService.notify(partner, {
      type,
      userName: getUser(match, authUser).name,
      data: match.id.toString(),
    });
  }

  private async getAddressDetails(placeId: string) {
    const googleApiKey = this.configService.get('GOOGLE_API_KEY');

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${googleApiKey}`;

    const response: any = await this.httpService.get(url).toPromise();

    return response.data.result;
  }

  private findOneMatchWithUsers(matchId: Match['id']) {
    return this.withJoins(
      this.matchRepository
        .createQueryBuilder('match')
        .where('"match"."id" = :matchId', { matchId }),
    ).getOne();
  }

  private withJoins(queryBuilder: SelectQueryBuilder<Match>) {
    queryBuilder
      .leftJoinAndSelect('match.fromUser', 'fromUser')
      .leftJoinAndSelect('match.toUser', 'toUser')
      .leftJoinAndSelect('match.meeting', 'meeting')
      .leftJoinAndSelect('meeting.fromUserAddress', 'fromUserAddress')
      .leftJoinAndSelect('meeting.toUserAddress', 'toUserAddress')
      .leftJoinAndSelect('meeting.acceptedAddress', 'acceptedAddress');

    return queryBuilder;
  }
}
