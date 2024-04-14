import {PageContainer} from '../components/pageContainer/PageContainer';
import {GetStaticProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import Link from 'next/link';

export default function Terms() {
    return (
        <PageContainer title="Safety Tips">
            <p>
                Meeting new people is exciting, but you should always be
                cautious when interacting with someone you don’t know. Use your
                best judgment and put your safety first, whether you are
                exchanging initial messages or meeting in person. While you
                can’t control the actions of others, there are things you can do
                to help you stay safe during your mmeet experience.
            </p>

            <br />

            <p>Online Safety</p>

            <br />

            <ul>
                <li>
                    Never Send Money or Share Financial Information Never send
                    money, especially over wire transfer, even if the person
                    claims to be in an emergency. Wiring money is like sending
                    cash — it’s nearly impossible to reverse the transaction or
                    trace where the money went. Never share information that
                    could be used to access your financial accounts. If another
                    user asks you for money, report it to us immediately. For
                    tips on avoiding romance scams, check out some advice from
                    the U.S Federal Trade Commission on the FTC website.
                </li>
                <li>
                    Protect Your Personal Information Never share personal
                    information, such as your social security number, home or
                    work address, or details about your daily routine (e.g.,
                    that you go to a certain gym every Monday) with people you
                    don’t know. If you are a parent, limit the information that
                    you share about your children on your profile and in early
                    communications. Avoid sharing details such as your
                    children’s names, where they go to school, or their ages or
                    genders.
                </li>
                <li>
                    Be Wary of Long Distance and Overseas Relationships Watch
                    out for scammers who claim to be from your country but stuck
                    somewhere else, especially if they ask for financial help to
                    return home. Be wary of anyone who will not meet in person
                    or talk on a phone/video call—they may not be who they say
                    they are. If someone is avoiding your questions or pushing
                    for a serious relationship without meeting or getting to
                    know you first — that’s a red flag.
                </li>
                <li>
                    Report All Suspicious and Offensive Behavior You know when
                    someone’s crossed the line and when they do, we want to know
                    about it. Block and report anyone that violates our terms.
                    Here are some examples of violations:
                    <ul>
                        <li>Requests for money or donations</li>
                        <li>Underage users</li>
                        <li>Harassment, threats, and offensive messages</li>
                        <li>
                            Inappropriate or harmful behavior during or after
                            meeting in person
                        </li>
                        <li>Fraudulent profiles</li>
                        <li>
                            Spam or solicitation including links to commercial
                            websites or attempts to sell products or services
                        </li>
                    </ul>
                </li>
                <li>
                    You can report any concerns about suspicious behavior from
                    any profile page or messaging window{' '}
                    <Link href="contacts">here</Link>. For more information,
                    check out our{' '}
                    <Link href="communityGuidelines">Community Guidelines</Link>
                    .
                </li>
                <li>
                    Protect Your Account Be sure to pick a strong password, and
                    always be careful when logging into your account from a
                    public or shared computer. mmeet will never send you an
                    email asking for your username and password information — if
                    you receive an email asking for account information, report
                    it immediately.
                </li>
            </ul>

            <br />

            <p>Meeting in Person</p>

            <br />

            <ul>
                <li>
                    Meet in Public and Stay in Public Meet for the first few
                    times in a populated, public place — never at your home,
                    your date’s home, or any other private location. If your
                    date pressures you to go to a private location, end the
                    date.
                </li>
                <li>
                    Tell Friends and Family About Your Plans Tell a friend or
                    family member of your plans, including when and where you’re
                    going. Have your cell phone charged and with you at all
                    times.
                </li>
                <li>
                    Be in Control of Your Transportation We want you to be in
                    control of how you get to and from your date so that you can
                    leave whenever you want. If you’re driving yourself, it’s a
                    good idea to have a backup plan such as a ride-share app or
                    a friend to pick you up.
                </li>
                <li>
                    Know Your Limits Be aware of the effects of drugs or alcohol
                    on you specifically — they can impair your judgment and your
                    alertness. If your date tries to pressure you to use drugs
                    or drink more than you’re comfortable with, hold your ground
                    and end the date.
                </li>
                <li>
                    Don’t Leave Drinks or Personal Items Unattended Know where
                    your drink comes from and know where it is at all times —
                    only accept drinks poured or served directly from the
                    bartender or server. Many substances that are slipped into
                    drinks to facilitate sexual assault are odorless, colorless,
                    and tasteless. Also, keep your phone, purse, wallet, and
                    anything containing personal information on you at all
                    times.
                </li>
                <li>
                    If You Feel Uncomfortable, Leave It’s okay to end the date
                    early if you’re feeling uncomfortable. In fact, it’s
                    encouraged. And if your instincts are telling you something
                    is off or you feel unsafe, ask the bartender or server for
                    help.
                </li>
                <li>
                    LGBTQ+ Travel Be careful while traveling We recognize and
                    believe in the importance of being inclusive of all gender
                    identities and sexual orientations, but the reality is this:
                    nowhere in the world is without potential risk, and some
                    countries have specific laws that target LGBTQ+ people.
                    Check out the laws around you when you travel to a new place
                    and research what types of legal protection, if any, are
                    available to you based on sexual orientation. In the event
                    that you’re in unsafe territory, we suggest toggling off
                    “Show me on mmeet” which you can find under the settings
                    page. If you have added a sexual orientation to your profile
                    and choose to be shown on mmeet, we will hide your sexual
                    orientation from your profile until you leave that area.
                    It’s important to exercise extra caution if you choose to
                    connect with new people in these countries - as some law
                    enforcement have been known to use dating apps as tools for
                    potential entrapment. Some countries have also recently
                    introduced laws that criminalize communications between
                    individuals on same-sex dating applications or websites and
                    even aggravate penalties if that communication leads to
                    sexual encounters. Visit ILGA World to see the latest sexual
                    orientation laws by country, and consider donating to
                    support their research. Source: ILGA World, Updated March
                    2019
                </li>
            </ul>

            <br />

            <p>Sexual Health & Consent</p>

            <br />

            <ul>
                <li>
                    Protect Yourself When used correctly and consistently,
                    condoms can significantly reduce the risk of contracting and
                    passing on STI’s like HIV. But, be aware of STIs like herpes
                    or HPV that can be passed on through skin-to-skin contact.
                    The risk of contracting some STIs can be reduced through
                    <Link href="https://www.ashasexualhealth.org/vaccines/">
                        vaccination
                    </Link>
                    .
                </li>
                <li>
                    Know Your Status Not all STIs show symptoms, and you don’t
                    want to be in the dark about your status. Stay on top of
                    your health and prevent the spread of STIs by getting tested
                    regularly. Here’s where you can{' '}
                    <Link href={'https://gettested.cdc.gov/'}>
                        find a clinic near you
                    </Link>{' '}
                    (US only).
                </li>
                <li>
                    Talk About It Communication is everything: Before you get
                    physically intimate with a partner, talk about sexual health
                    and STI testing. And be aware — in some places, it’s
                    actually a crime to knowingly pass on an STI. Need help
                    starting the conversation?{' '}
                    <Link href="https://www.plannedparenthood.org/learn/stds-hiv-safer-sex/get-tested/how-do-i-talk-my-partner-about-std-testing">
                        Here
                    </Link>{' '}
                    are some tips.
                </li>
                <li>
                    Consent All sexual activity must start with consent and
                    should include ongoing check-ins with your partner. Verbal
                    communication can help you and your partner ensure that you
                    respect each other’s boundaries. Consent can be withdrawn at
                    any time, and sex is never owed to anyone. Do not proceed if
                    your partner seems uncomfortable or unsure, or if your
                    partner is unable to consent due to the effects of drugs or
                    alcohol. Read more about it{' '}
                    <Link href="https://www.rainn.org/articles/what-is-consent">
                        here
                    </Link>
                    .
                </li>
            </ul>

            <br />

            <p>Resources for Help, Support, or Advice</p>

            <br />

            <p>
                Remember — even if you follow these tips, no method of risk
                reduction is perfect. If you have a negative experience, please
                know that it is not your fault and help is available. Report any
                incidents mmeet, and consider reaching out to one of the
                resources below. If you feel you are in immediate danger or need
                emergency assistance, call 911 (U.S. or Canada) or your local
                law enforcement agency.
            </p>

            <br />

            <p>RAINN’s National Sexual Assault Hotline</p>
            <p>1-800-656-HOPE (4673) | online.rainn.org | www.rainn.org</p>

            <br />

            <p>Planned Parenthood</p>
            <p>1-800-230-7526 | www.plannedparenthood.org</p>

            <br />

            <p>National Domestic Violence Hotline</p>
            <p>1-800-799-SAFE (7233) or 1-800-787-3224 | www.thehotline.org</p>

            <br />

            <p>National Human Trafficking Hotline</p>
            <p>
                1-888-373-7888 or text 233733 | www.humantraffickinghotline.org
            </p>

            <br />

            <p>National Sexual Violence Resource Center</p>
            <p>1-877-739-3895 | www.nsvrc.org</p>

            <br />

            <p>National Center for Missing & Exploited Children</p>
            <p>1-800-THE-LOST (843-5678) | www.cybertipline.com</p>

            <br />

            <p>Cyber Civil Rights Initiative</p>
            <p>1-844-878-2274 | www.cybercivilrights.org</p>

            <br />

            <p>VictimConnect - Crime Victim Resource Center</p>
            <p>1-855-4VICTIM (855-484-2846) | www.victimconnect.org</p>

            <br />

            <p>FBI Internet Crime Complaint Center</p>
            <p>www.ic3.gov</p>

            <br />

            <p>LGBT National Help Center</p>
            <p>1-888-843-4564 | www.lgbtnationalhelpcenter.org</p>

            <p>Trans Lifeline</p>
            <p>
                1-877-565-8860 (US) or 1-877-330-6366 (CA) |
                www.translifeline.org
            </p>

            <br />

            <p>If you are outside the US:</p>

            <br />

            <ul>
                <li>
                    <Link href="https://mtch.com/safety-details-international">
                        Click here
                    </Link>
                    for additional resources in many of the countries where we
                    operate.
                </li>
                <li>
                    <Link href="https://ilga.org/about-us">Click here</Link> for
                    information regarding international sexual orientation laws
                    from the International Lesbian, Gay, Bisexual, Trans and
                    Intersex Association (ILGA).
                </li>
            </ul>

            <br />
        </PageContainer>
    );
}

export const getStaticProps: GetStaticProps = async ({locale}) => ({
    props: {
        ...(await serverSideTranslations(locale!, ['footer'])),
    },
});
