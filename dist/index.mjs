import { jsx } from 'react/jsx-runtime';
import { Stack } from 'expo-router';
import { useMemo, useCallback } from 'react';
import 'react-native-reanimated';
import { pageConfig } from '@gaddario98/react-pages';
import { useAuthValue } from '@gaddario98/react-auth';

//SplashScreen.preventAutoHideAsync();
const LayoutGenerator = ({ screens, userType, initialRouteName, }) => {
    const user = useAuthValue();
    const isAuthenticated = useMemo(() => pageConfig.isLogged(user), [user]);
    const isRedirect = useCallback((screen) => {
        let val = false;
        if (!screen)
            return false;
        if (screen.requireAuth)
            val = !isAuthenticated;
        if (screen.hideIfAuth)
            val = isAuthenticated;
        if (screen.userType && userType !== screen.userType)
            val = true;
        return val;
    }, [isAuthenticated, userType]);
    const screenOptions = useMemo(() => ({
        headerShown: false,
        keyboardHandlingEnabled: true,
    }), []);
    /*
    const renderHeader = useCallback(
      (title: string, customNs?: string, props?: Screen["headerProps"]) =>
        title ? (
          <Header
            title={t(title, { ns: customNs ?? ns })}
            {...props}
            style={{
              marginHorizontal: padding,
              marginTop: padding / 2,
            }}
            leftAction={{
              icon: "arrow-back",
              onPress() {
                router.back();
              },
            }}
          />
        ) : null,
      [ns, t]
    );*/
    return (jsx(Stack, { screenOptions: screenOptions, initialRouteName: initialRouteName !== null && initialRouteName !== void 0 ? initialRouteName : screens[0].name, children: screens.map((screen) => {
            var _a;
            return (jsx(Stack.Screen, { name: screen.name, options: Object.assign({ headerShown: Boolean(screen.header), header: screen.header }, ((_a = screen === null || screen === void 0 ? void 0 : screen.options) !== null && _a !== void 0 ? _a : {})), redirect: isRedirect(screen) }, screen.name));
        }) }));
};

export { LayoutGenerator };
//# sourceMappingURL=index.mjs.map
