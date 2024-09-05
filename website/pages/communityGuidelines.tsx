import {PageContainer} from '../components/pageContainer/PageContainer';
import {GetStaticProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import Link from 'next/link';

export default function Terms() {
    return (
        <PageContainer title="Community Guidelines">
            <p>
                Welcome to the mmeet community. If you’re honest, kind and
                respectful to others, you’ll always be welcome here. If you
                choose not to be, you may not last. Our goal is to allow users
                to express themselves freely as long as it doesnt offend others.
                Everyone is held to the same standard on mmeet. We’re asking you
                to be considerate, think before you act, and abide by our
                community guidelines both on and offline. You heard that right:
                your offline behavior can lead to termination of your mmeet
                account.
            </p>

            <br />

            <p>
                Below is a list of our community policies. If you violate any of
                these policies, you might be banned from mmeet. Seriously, don’t
                make us Swipe Left on you—because there will be no do-overs once
                we do. We encourage you to <Link href="contacts">report</Link>{' '}
                any behavior that violates our policies, and read up on our{' '}
                <Link href="safetyTips">Safety Tips</Link>.
            </p>

            <br />

            <p>mmeet is not for:</p>

            <br />

            <p>Nudity/Sexual Content</p>

            <p>
                We’re not asking you to comb your hair to one side or even speak
                in full sentences; but please keep it classy and appropriate for
                public consumption. No nudity, no sexually explicit content, and
                don’t chronicle all of your sexual desires in your bio. Keep it
                clean.
            </p>

            <br />

            <p>Harassment</p>

            <p>
                Do not engage, or encourage others to engage, in any targeted
                abuse or harassment against any other user. This includes
                sending any unsolicited sexual content to your matches. Reports
                of stalking, threats, bullying, or intimidation, are taken very
                seriously.
            </p>

            <br />

            <p>Violence and Physical Harm</p>

            <p>
                We do not tolerate violent, graphic, or gory content on mmeet,
                or any actions or content that advocate for or threaten violence
                of any sort, including threatening or promoting terrorism.
                Physical assault, coercion, and any acts of violence are
                strictly prohibited.
            </p>

            <p>
                Content that advocates for or glorifies suicide or self-harm is
                also not allowed. In these situations, we may take a number of
                steps to assist the user, including reaching out with crisis
                resources.
            </p>

            <br />

            <p>Hate Speech</p>

            <p>
                Any content that promotes, advocates for, or condones racism,
                bigotry, hatred, or violence against individuals or groups based
                on factors like (but not limited to) race, ethnicity, religious
                affiliation, disability, gender, age, national origin, sexual
                orientation, or gender identity is not allowed.
            </p>

            <br />

            <p>Private Information</p>

            <p>
                Don’t publicly broadcast any private information, yours or
                anyone else’s. This includes social security numbers, passports,
                passwords, financial information or unlisted contact
                information, such as phone numbers, email addresses, home/work
                address.
            </p>

            <br />

            <p>Spam</p>

            <p>
                Don’t be fake. Be real instead. Don’t use mmeet to drive people
                to external websites via a link or otherwise.
            </p>

            <br />

            <p>Promotion or Solicitation</p>

            <p>
                Soliciting other users is prohibited on mmeet. It’s fine to
                invite your matches to something that you’re doing, but if the
                purpose of your profile is to advertise your event or business,
                non-profit, political campaign, contest, or to conduct research,
                we may delete your account. While we’re excited that you’re
                doing a comedy show next week, please don’t use mmeet to promote
                it.
            </p>

            <br />

            <p>Prostitution and Trafficking</p>

            <p>
                Promoting or advocating for commercial sexual services, human
                trafficking or other non-consensual sexual acts is strictly
                prohibited and will result in your account being banned from
                mmeet.
            </p>

            <br />

            <p>Scamming</p>

            <p>
                mmeet has a zero-tolerance policy on predatory behavior of any
                kind. Anyone attempting to get other users’ private information
                for fraudulent or illegal activity may be banned. Any user
                caught sharing their own financial account information (PayPal,
                Venmo, etc.) for the purpose of receiving money from other users
                may also be banned from mmeet.
            </p>

            <br />

            <p>Impersonation</p>

            <p>Be yourself! Don’t pretend to be someone else.</p>

            <p>
                Do not impersonate, or otherwise misrepresent affiliation,
                connection or association with, any person or entity. This
                includes parody accounts. While we think your Mike Pence profile
                is hilarious, you aren’t Mike Pence. And if you are, what are
                you doing on mmeet?
            </p>

            <br />

            <p>Minors</p>

            <p>
                You must be 18 years of age or older to use mmeet. As such, we
                do not allow images of unaccompanied minors. If you want to post
                photos of your children, please make sure that you are in the
                photo as well. If you see a profile that includes an
                unaccompanied minor, encourages harm to a minor, or depicts a
                minor in a sexual or suggestive way, please{' '}
                <Link href="contacts">report it immediately</Link>.
            </p>

            <br />

            <p>Copyright and Trademark Infringement</p>

            <p>
                If it’s not yours, don’t post it. If your mmeet profile includes
                any work that is copyrighted or trademarked by others, don’t
                display it, unless you are allowed to do so.
            </p>

            <br />

            <p>Illegal Usage</p>

            <p>
                Don’t use mmeet to do anything illegal. If it’s illegal IRL,
                it’s illegal on mmeet.
            </p>

            <br />

            <p>One Person, One Account</p>

            <p>
                mmeet accounts cannot have multiple owners, so don’t create an
                account with your friend or significant other. Additionally,
                please don’t maintain multiple mmeet accounts.
            </p>

            <br />

            <p>Third Party Apps</p>

            <p>
                The use of any apps created by anyone other than mmeet that
                claim to offer our service or unlock special mmeet features
                (like auto-swipers) is not allowed.
            </p>

            <br />

            <p>Account Dormancy</p>

            <p>
                mmeet is fun to use... all the time! Use mmeet at the lake, use
                mmeet while eating cake. Use mmeet when you’re out, use mmeet
                when in doubt! But, if you don’t log in to your mmeet account in
                2 years, we may delete your account for inactivity.
            </p>

            <br />
        </PageContainer>
    );
}

export const getStaticProps: GetStaticProps = async ({locale}) => ({
    props: {
        ...(await serverSideTranslations(locale!, ['footer'])),
    },
});
