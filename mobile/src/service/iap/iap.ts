// import {
//     initConnection,
//     purchaseUpdatedListener,
//     purchaseErrorListener,
//     finishTransaction,
//     Purchase,
//     Subscription,
//     requestSubscription,
//     RequestSubscriptionAndroid,
// } from 'react-native-iap';
// import {AppState, EmitterSubscription} from 'react-native';
import {makeVar} from '@apollo/client';

// export const SUBSCRIPTION = makeVar<Subscription[]>([]);
export const SUBSCRIPTION = makeVar<any[]>([]);
export const IS_IAP_INITIALIZED = makeVar(false);

export const buySubscription = (monthCount: number) => {
    // const sku = `app.mmeet.subscriptions.${monthCount}m`;
    //
    // console.log(sku);
    //
    // // TODO speficy offerToken
    // const request: RequestSubscriptionAndroid = {
    //     subscriptionOffers: [{sku, offerToken: ''}],
    // };
    //
    // requestSubscription(request)
    //     .then(subscriptionPurchase => {
    //         if (!subscriptionPurchase) {
    //             return;
    //         }
    //
    //         console.log('requestSubscription', subscriptionPurchase.productId);
    //     })
    //     .catch(reason => console.warn('requestSubscription catch', reason));
};

export const setupIap = () => {
    // initConnection()
    //     .then(() => {
    //         setupListeners();
    //
    //         IS_IAP_INITIALIZED(true);
    //
    //         // getProducts({
    //         //     skus: [
    //         //         'app.mmeet.subscriptions.12m',
    //         //         'app.mmeet.subscriptions.6m',
    //         //         'app.mmeet.subscriptions.1m',
    //         //     ],
    //         // })
    //         //     .then(value => console.log('getProducts', value))
    //         //     .catch(reason => console.error('getProducts', reason));
    //
    //         // client
    //         //     .query<PaymentSkusQuery, PaymentSkusQueryVariables>({
    //         //         query: PaymentSkusDocument,
    //         //     })
    //         //     .then(value => {
    //         //         if (!value.data.paymentSkus) {
    //         //             return;
    //         //         }
    //         //
    //         //         const skus = value.data.paymentSkus.map(sku => sku.sku);
    //         //
    //         //         console.log('my skus from backend', skus);
    //         //
    //         //         getSubscriptions({skus})
    //         //             .then(subscription => SUBSCRIPTION(subscription))
    //         //             .catch(reason => console.log('getProducts catch', reason));
    //         //     });
    //     })
    //     .catch(reason => console.error(reason));
};

const ackPurchase = async (purchase: any /*Purchase*/) => {
    console.log('ackPurchase', purchase.productId);

    if (!purchase.transactionReceipt) {
        return;
    }

    await ackPurchaseMmeetSide(purchase);

    await ackPurchaseAppleSide(purchase);
};

const ackPurchaseMmeetSide = async (purchase: any /*Purchase*/) => {
    console.log('ackPurchaseMmeetSide', purchase.productId);

    // await client.mutate<
    //     PaymentBuyMmeetsMutation,
    //     PaymentBuyMmeetsMutationVariables
    // >({
    //     mutation: PaymentBuyMmeetsDocument,
    //     variables: {
    //         input: {
    //             productId: purchase.productId,
    //             purchase: JSON.stringify(purchase),
    //         },
    //     },
    // });
};

const ackPurchaseAppleSide = async (purchase: any /*Purchase*/) => {
    console.log('ackPurchaseAppleSide', purchase.productId);

    // try {
    //     await finishTransaction({purchase, isConsumable: true});
    // } catch (e: any) {
    //     console.log('purchaseUpdatedListener catch', e);
    // }
};

const setupListeners = () => {
    // let purchaseUpdatedListenerSubscription: EmitterSubscription | null;
    // let purchaseErrorSubscription: EmitterSubscription | null;
    //
    // const setup = () => {
    //     try {
    //         purchaseUpdatedListenerSubscription = purchaseUpdatedListener(
    //             purchase => {
    //                 console.log('purchaseUpdatedListener', purchase.productId);
    //
    //                 ackPurchase(purchase);
    //             },
    //         );
    //
    //         purchaseErrorSubscription = purchaseErrorListener(error =>
    //             console.log('purchaseErrorListener', error),
    //         );
    //     } catch (e: any) {
    //         console.error('iap setup', e);
    //     }
    // };
    //
    // const clear = () => {
    //     if (purchaseUpdatedListenerSubscription) {
    //         purchaseUpdatedListenerSubscription.remove();
    //         purchaseUpdatedListenerSubscription = null;
    //     }
    //
    //     if (purchaseErrorSubscription) {
    //         purchaseErrorSubscription.remove();
    //         purchaseErrorSubscription = null;
    //     }
    // };
    //
    // setup();
    //
    // AppState.addEventListener('change', state => {
    //     switch (state) {
    //         case 'active': {
    //             // console.log('AppState.addEventListener change', 'active');
    //
    //             setup();
    //
    //             break;
    //         }
    //         case 'inactive': {
    //             // console.log('AppState.addEventListener change', 'inactive');
    //
    //             clear();
    //
    //             break;
    //         }
    //     }
    // });
};

/*

subscription from getSubscriptions

{"countryCode": "UKR", "currency": "USD", "description": "All-in package", "discounts": [], "introductoryPrice": "", "introductoryPriceAsAmountIOS": "", "introductoryPriceNumberOfPeriodsIOS": "", "introductoryPricePaymentModeIOS": "", "introductoryPriceSubscriptionPeriodIOS": "", "localizedPrice": "23,99 US$", "price": "23.99", "productId": "app.mmeet.subscription", "subscriptionPeriodNumberIOS": "1", "subscriptionPeriodUnitIOS": "MONTH", "title": "All-in package", "type": "subs"}

 */
