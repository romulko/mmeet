describe('Example', () => {
    // beforeAll(async () => {
    //     await device.launchApp({
    //         permissions: {notifications: 'YES'},
    //         launchArgs: {user: 'man'},
    //     });
    // });
    //
    // beforeEach(async () => {
    //     await device.reloadReactNative();
    // });

    it('flow', async () => {
        // await axios
        //     .delete('http://localhost:3000/match', {
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         data: JSON.stringify({email: 'man.omeetuser@gmail.com'}),
        //     })
        //     .then(value => console.log(value))
        //     .catch(reason => console.log(reason));
        // await fetch('http://localhost:3000/match', {
        //     method: 'DELETE',
        //     body: JSON.stringify({email: 'man.omeetuser@gmail.com'}),
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     mode: 'no-cors',
        // });

        // TODO set right params for users (birthday, genders, etc...)

        await launchApp('man');

        await expect(element(by.id('proposalName'))).toHaveText('Woman');
        await element(by.label('Matches')).tap();
        await expect(element(by.id('noMatches'))).toBeVisible();

        await launchApp('woman');

        await expect(element(by.id('proposalName'))).toHaveText('Man');
        await element(by.label('Matches')).tap();
        await expect(element(by.id('noMatches'))).toBeVisible();

        await launchApp('man');

        await element(by.id('like')).tap();

        await waitFor(element(by.id('noProposal')))
            .toBeVisible()
            .withTimeout(1000);

        await expect(element(by.id('noProposal'))).toBeVisible();

        await element(by.label('Matches')).tap();
        await expect(element(by.id('noMatches'))).toBeVisible();

        await launchApp('woman');

        await expect(element(by.id('proposalName'))).toHaveText('Man');
        await element(by.label('Matches')).tap();
        await expect(element(by.id('noMatches'))).toBeVisible();

        await element(by.label('Find')).tap();

        await element(by.id('like')).tap();

        await waitFor(element(by.id('noProposal')))
            .toBeVisible()
            .withTimeout(1000);

        // TODO it's not good that match will not arrive by FCM. Maybe test on real device?

        await launchApp('man');
        await expect(element(by.id('noProposal'))).toBeVisible();

        await element(by.label('Matches')).tap();
        await expect(element(by.id('WomanMatchStatus'))).toHaveText(
            "watch Woman's video",
        );

        await launchApp('woman');
        await expect(element(by.id('noProposal'))).toBeVisible();

        await element(by.label('Matches')).tap();
        await expect(element(by.id('ManMatchStatus'))).toHaveText(
            "watch Man's video",
        );
    });
});

const launchApp = async user => {
    await device.terminateApp();

    await device.launchApp({
        permissions: {notifications: 'YES'},
        launchArgs: {user},
    });
};
