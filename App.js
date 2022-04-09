import * as React from 'react';
import {Button, Platform, Text, View, SafeAreaView, StyleSheet} from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const useProxy = Platform.select({ web: false, default: true });

const redirectUri = AuthSession.makeRedirectUri({
    useProxy,
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 30,
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        textAlign: 'center',
    },
});


export default function App() {
    const discovery = AuthSession.useAutoDiscovery('https://chomnoue.auth0.com');

    // Create and load an auth request
    const [request, result, promptAsync] = AuthSession.useAuthRequest(
        {
            clientId: 'KYU74QAJvasC48cqHb3CpI3NpGEcj1du',
            responseType: AuthSession.ResponseType.Token,
            redirectUri,
            scopes: ['openid', 'profile', 'email', 'offline_access'],
            extraParams: {
                audience: "https://chomnoue.auth0.com/api/v2/"
            },
        },
        discovery
    );

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                <Button title="Login!" disabled={!request} onPress={() => promptAsync({useProxy})}/>
                {result && <Text style={styles.paragraph}>{JSON.stringify(result, null, 2)}</Text>}
            </View>
        </SafeAreaView>
    );
}
