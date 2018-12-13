import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Icon } from 'native-base';

import Suppliers from '../screens/Suppliers';
import Settings from '../screens/Settings';
import SupplierDetails from '../screens/SupplierDetails';
import NewSupplier from '../screens/NewSupplier';
import Buy from '../screens/Buy';
import Login from '../screens/Login';
import Transactions from '../screens/Transactions';
import Profile from '../screens/Profile';
import SitesDownloader from '../screens/SitesDownloader';
import SupplierInfo from '../screens/SupplierInfo';


export const LoginStack = createStackNavigator({
	Login: {
		screen: Login,
		navigationOptions: {
			header: null,
		}
	},
});

export const FeedStack = createStackNavigator({
	Suppliers: {
		screen: Suppliers,
		navigationOptions: {
			title: 'Suppliers',
			headerTintColor: '#FFF',
			headerStyle: {
				backgroundColor: '#3fa044',
			},
			headerTitleStyle: {
				color: '#FFF',
			},
		},
	},
	Profile: {
		screen: Profile,
		navigationOptions: {
			title: 'Profile',
			headerTintColor: '#FFF',
			headerStyle: {
				backgroundColor: '#3fa044',
			},
			headerTitleStyle: {
				color: '#FFF',
			},
		},
	},
	SitesDownloader: {
		screen: SitesDownloader,
		navigationOptions: {
			title: 'Sites Downloader',
			headerTintColor: '#FFF',
			headerStyle: {
				backgroundColor: '#3fa044',
			},
			headerTitleStyle: {
				color: '#FFF',
			},
		},
	},
	SupplierDetails: {
		screen: SupplierDetails,
		navigationOptions: ({ navigation }) => ({
			title: `${navigation.state.params.firstName} ${navigation.state.params.lastName}`,
			headerTintColor: '#FFF',
			headerStyle: {
				backgroundColor: '#3fa044',
			},
			headerTitleStyle: {
				color: '#FFF',
			},
		}),
	},
    SupplierInfo: {
        screen: SupplierInfo,
        navigationOptions: ({ navigation }) => ({
            title: `About ${navigation.state.params.firstName}`,
            headerTintColor: '#FFF',
            headerStyle: {
                backgroundColor: '#3fa044',
            },
            headerTitleStyle: {
                color: '#FFF',
            },
        }),
    },
	Buy: {
		screen: Buy,
		navigationOptions: ({ navigation }) => ({
			title: `Buy from ${navigation.state.params.firstName}`,
			headerTintColor: '#FFF',
			headerStyle: {
				backgroundColor: '#3fa044',
			},
			headerTitleStyle: {
				color: '#FFF',
			},
		}),
	},
	Transactions: {
		screen: Transactions,
		navigationOptions: ({ navigation }) => ({
			title: `Transactions with ${navigation.state.params.firstName}`,
			headerTintColor: '#FFF',
			headerStyle: {
				backgroundColor: '#3fa044',
			},
			headerTitleStyle: {
				color: '#FFF',
			},
		})
	},
	NewSupplier: {
		screen: NewSupplier,
		navigationOptions: {
			title: 'Register Supplier',
			headerTintColor: '#FFF',
			headerStyle: {
				backgroundColor: '#3fa044',
			},
			headerTitleStyle: {
				color: '#FFF',
			},
		}
	},
	Settings: {
		screen: Settings,
		navigationOptions: {
			title: 'Settings',
			headerTintColor: '#FFF',
			headerStyle: {
				backgroundColor: '#3fa044',
			},
			headerTitleStyle: {
				color: '#FFF',
			},
		},
	},
});

export const Tabs = createBottomTabNavigator({
	Suppliers: {
		screen: FeedStack,
		navigationOptions: {
			tabBarLabel: 'Suppliers',
			tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />,
		},
	},
	NewSupplier: {
		screen: NewSupplier,
		navigationOptions: {
			tabBarLabel: 'Register Supplier',
			tabBarIcon: ({ tintColor }) => <Icon name="person-add" size={35} color={tintColor} />
		},
	},
	Settings: {
		screen: Settings,
		navigationOptions: {
			tabLabel: 'Settings',
			tabBarIcon: ({ tintColor }) => <Icon name="cog" size={35} color={tintColor} />
		},
	},
});


export const AppRoot = createStackNavigator({
	Login: {
		screen: LoginStack,
	},
	Tabs: {
		screen: Tabs,
	},
}, {
	mode: 'modal',
	headerMode: 'none',
});
