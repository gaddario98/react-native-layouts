import { Stack } from "expo-router";
import { ComponentProps, FC, useCallback, useMemo } from "react";
import "react-native-reanimated";
import { pageConfig } from "@gaddario98/react-pages";
import { LayoutGeneratorProps, Screen } from "./types";
import { useAuthValue } from "@gaddario98/react-auth";
//SplashScreen.preventAutoHideAsync();

const LayoutGenerator = ({
  screens,
  userType,
  initialRouteName,
}: LayoutGeneratorProps) => {
  const user = useAuthValue();

  const isAuthenticated = useMemo(() => pageConfig.isLogged(user), [user]);

  const isRedirect = useCallback(
    (screen: Screen) => {
      let val = false;
      if (!screen) return false;
      if (screen.requireAuth) val = !isAuthenticated;
      if (screen.hideIfAuth) val = isAuthenticated;
      if (screen.userType && userType !== screen.userType) val = true;
      return val;
    },
    [isAuthenticated, userType]
  );

  const screenOptions = useMemo(
    (): ComponentProps<typeof Stack>["screenOptions"] => ({
      headerShown: false,
      keyboardHandlingEnabled: true,
    }),
    []
  );
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

  return (
    <Stack
      screenOptions={screenOptions}
      initialRouteName={initialRouteName ?? screens[0].name}
    >
      {screens.map((screen) => {
        return (
          <Stack.Screen
            key={screen.name}
            name={screen.name}
            options={{
              headerShown: Boolean(screen.header),
              header: screen.header,
              ...(screen?.options ?? {}),
            }}
            redirect={isRedirect(screen)}
           /* getId={({ params }) => {
              const p = params?.[screen.name.slice(1, -1)];
              return `${screen.name}/${p ?? ""}`;
            }}dangerouslySingular*/
          />
        );
      })}
    </Stack>
  );
};

export default LayoutGenerator;
