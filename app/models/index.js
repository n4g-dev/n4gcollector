import Communities from './Communities';
import Countries from './Countries';
import Districts from './Districts';
import Organizations from './Organizations';
import Products from './Products';
import Regions from './Regions';
import Suppliers from './Suppliers';
import Transactions from './Transactions';
import Transits from './Transits';
import Users from './Users';
import Currencies from './Currencies';

export const communities = Communities;
export const countries = Countries;
export const districts = Districts;
export const currencies = Currencies;
export const organizations = Organizations;
export const products = Products;
export const regions = Regions;
export const suppliers = Suppliers;
export const transactions = Transactions;
export const transits = Transits;
export const users = Users;


export const modelsInOrder = [
	Transits,
	Transactions,
	Suppliers,
	Users,
	Organizations,
	Communities,
	Districts,
	Regions,
	Countries,
	Currencies,
	Products,
];
