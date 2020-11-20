import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {AdMobInterstitial} from 'react-native-admob';

const AdScreen = () => {
    const onFailToRecieveAd = (error) => console.log(error);
    return (
        <>
        <SafeAreaView>
          <AdMobInterstitial
            adSize="largeBanner"
            adUnitID="ca-app-pub-6198127817586825/8172324285"
            didFailToReceiveAdWithError={onFailToRecieveAd}
          />
        </SafeAreaView>
      </>
    )
}

export default AdScreen;