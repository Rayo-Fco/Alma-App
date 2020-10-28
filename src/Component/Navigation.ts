import { RouteProp, CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';

export interface AuthNavigationProps<RouteName extends keyof AuthRoutes> {
    navigation: CompositeNavigationProp<StackNavigationProp<AuthRoutes, RouteName>,DrawerNavigationProp<AppRoutes, "Home">>;
    route: RouteProp<AuthRoutes, RouteName>;
}

export interface HomeNavigationProps<RouteName extends keyof HomeRoutes> {
    navigation: DrawerNavigationProp<HomeRoutes, RouteName>;
    route: RouteProp<HomeRoutes, RouteName>;
}

export type AppRoutes = {
    Auth: undefined;
    Home: undefined;
}

export type AuthRoutes = {
    Login: undefined;
    Principal: undefined;
    Registro: undefined;
}

export type HomeRoutes = {
    Contacto: undefined;
    Check: undefined;
    Inicio: undefined;
    Perfil: undefined
}
