import React, { PureComponent } from 'react';
import { Form, Input, Button, Item, Text, Picker, Content, Left, Right, DatePicker } from 'native-base';
import { connect } from 'react-redux';
import { index, createOne } from '../state/actions';
import {currencies} from '../models';
import moment from "moment";



class Buy extends PureComponent {

	constructor(props) {
		super(props);

		this.state = {
			quantity: '',
			date: '',
			produce: undefined,
			useCustomPrice: false,
			customPrice: '',
			currency: undefined,
			dialogVisible: false,
			status: 'collected',
			transact: false,
			unitPrice: '',
			amountPaid: '',
			sacs: '',
		};

		this.savePurchase = this.savePurchase.bind(this);
		this.updateQuantity = this.updateQuantity.bind(this);
		this.onCustomPriceChange = this.onCustomPriceChange.bind(this);
		this.onUseCustomPrice = this.onUseCustomPrice.bind(this);
		this.showDialog = this.showDialog.bind(this);
		this.hideDialog = this.hideDialog.bind(this);
		this.saveCustomPurchase = this.saveCustomPurchase.bind(this);
		this.onCurrencyChange = this.onCurrencyChange.bind(this);
		this.updateUnitPrice = this.updateUnitPrice.bind(this);
		this.updateAmountPaid = this.updateAmountPaid.bind(this);
		this.onStatusChange = this.onStatusChange.bind(this);
		this.updateSacsQuantity = this.updateSacsQuantity.bind(this);
	}

	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(index('products', {}));
		dispatch(index('currencies', {}));
	}

	onProduceChange(produce) {
		this.setState({
			produce
		});
	}

	onCurrencyChange(currency) {
		this.setState({
			currency
		});
	}

	onCustomPriceChange(customPrice) {
		if (isNaN(customPrice) === true) {
			this.setState({
				customPrice: '0'
			});
		} else {
			this.setState({
				customPrice
			});
		}
	}

	onStatusChange(status) {
		this.setState({
			status
		});
	}

	onUseCustomPrice() {
		const { useCustomPrice } = this.state;
		this.setState({
			useCustomPrice: !useCustomPrice
		});

		if (useCustomPrice === true) {
			this.setState({
				transact: false
			});
		}
	}

	showDialog() {
		this.setState({ dialogVisible: true });
	}

	hideDialog() {
		this.setState({ dialogVisible: false });
	}

	saveCustomPurchase() {
		this.setState({
			transact: true,
			dialogVisible: false
		});
	}


	updateQuantity(quantity) {
		if (isNaN(quantity) === true) {
			this.setState({
				quantity: '0'
			});
		} else {
			this.setState({ quantity });
		}
	}

    updateSacsQuantity(sacs) {
        if (isNaN(sacs) === true) {
            this.setState({
                quantity: '0'
            });
        } else {
            this.setState({ sacs });
        }
    }

	updateAmountPaid(amountPaid) {
		const { unitPrice, quantity, useCustomPrice, customPrice } = this.state;
		let price = unitPrice;

		if (useCustomPrice === true) {
			price = customPrice;
		}
		const total = parseFloat(quantity) * parseFloat(price);
		if (total < parseFloat(amountPaid)) {
			alert(`You cannot pay beyond cost of transaction. Max pay is ${total}`);
			return;
		}
		this.setState({
			amountPaid
		});
	}

	updateUnitPrice(unitPrice) {
		this.setState({
			unitPrice
		});
	}

	savePurchase() {
		const { produce, quantity, sacs, useCustomPrice, customPrice, unitPrice, transact, date,
			currency, amountPaid, status } = this.state;

		const {
			id
		} = this.props.navigation.state.params;

		const { user, dispatch } = this.props;

		/*
		if (useCustomPrice === true) {
			price = customPrice;
		}

		if (useCustomPrice === true && transact === false) {
			this.showDialog();
			return;
		} */


		const total = parseFloat(quantity) * parseFloat(unitPrice);
		if (total < parseFloat(amountPaid)) {
			alert(`You cannot pay beyond cost of transaction. Max pay is ${total}`);
			return;
		}



		if (produce === -1) {
			alert('Please select produce');
			return;
		}

		if (status === -1) {
			alert('Please select produce');
			return;
		}

		if (quantity <= 0) {
			alert('Please state quantity correctly.');
			return;
		}

		if (currency === -1) {
			alert('Please select currency');
			return;
		}

		const purchase = {};
		if (date.length < 8) {
			alert('Please enter transaction date');
			return;
		}
        if (sacs >= 0) {
            purchase.sacs = sacs;
        }
		purchase.date = date;
		purchase.productId = parseInt(produce);
		purchase.supplierId = parseInt(id);
		purchase.currencyId = parseInt(currency);
		purchase.collectorId = user.id;

		if (total > parseInt(amountPaid)) {
			purchase.payment = 'partially paid';
		} else if (total === parseInt(amountPaid)) {
			purchase.payment = 'paid';
		} else if (parseInt(amountPaid) === 0) {
			purchase.payment = 'unpaid';
		}

		purchase.amountPaid = parseInt(amountPaid);
		purchase.status = status;
		purchase.cost = total;
		purchase.yield = parseFloat(quantity);

		console.log(purchase);

		dispatch(createOne('transactions', purchase));
		this.setState({
            quantity: '0',
            date: '',
            produce: undefined,
            useCustomPrice: false,
            customPrice: '0',
            currency: undefined,
            dialogVisible: false,
            status: 'collected',
            transact: false,
            unitPrice: '0',
            amountPaid: '0',
			sacs: '0',
        });
	}

	render() {

		const {
			quantity,
			produce,
			unitPrice,
			/*useCustomPrice,
			customPrice,
			date,
			dialogVisible, */
			currency,
			amountPaid,
			// status,
			sacs,
		} = this.state;

		const { products, currencies } = this.props;

		const selectedCurrency = currencies.find(aCurrency => aCurrency.id === parseInt(currency));
		const selectedCurrencySymbol = selectedCurrency ? selectedCurrency.symbol : '';


		return (
			<Content>
				<Form style={{ width: '90%', alignSelf: 'center' }}>
					<Item
						style={{
							marginTop: 20,
							backgroundColor: 'brown',
							padding: 10,
						}}>
						<Text
							style={{
								fontSize: 18,
								color: 'white',
								textAlign: 'center'
							}}
						>Fill the form below</Text>
					</Item>
					<Item style={{ marginBottom: 30, marginTop: 15 }} picker>
						<Left>
							<Text
								style={{
									fontWeight: 'bold',
								}}
							>Produce: </Text>
						</Left>
						<Picker
							mode="dropdown"
							placeholder="Select produce"
							placeholderStyle={{ color: '#bfc6ea' }}
							style={{ width: 120 }}
							selectedValue={produce}
							onValueChange={this.onProduceChange.bind(this)}
						>
							<Picker.Item label='-- Select produce --' value={-1} />
							{
								products.map((product) =>
									<Picker.Item label={product.name} value={product.id} key={product.id}/>
								)
							}
						</Picker>
					</Item>
					<Item style={{ marginBottom: 30, marginTop: 10 }} picker>
						<Left>
							<Text
                                style={{
                                    fontWeight: 'bold',
                                }}
							>Currency: </Text>
						</Left>
						<Picker
							mode="dropdown"
							placeholder="Select currency"
							placeholderStyle={{ color: '#bfc6ea' }}
							style={{ width: 120 }}
							selectedValue={currency}
							onValueChange={this.onCurrencyChange.bind(this)}
						>
							<Picker.Item label='-- Select currency --' value={-1} />
							{
								currencies.map((currency) =>
									<Picker.Item label={currency.symbol} value={currency.id} key={currency.id}/>
								)
							}
						</Picker>
					</Item>
					<Item style={{ marginBottom: 30 }} picker>
						<Left>
							<Text
                                style={{
                                    fontWeight: 'bold',
                                }}
							>Enter volume (Kg): </Text>
						</Left>
						<Right>
							<Item regular>
								<Input
									keyboardType="numeric"
									name="quantity"
									style={{height: 40, color: 'black' }}
									value={ quantity }
									onChangeText={(quantity) => this.updateQuantity(quantity)}
								/>
							</Item>
						</Right>
					</Item>
                    <Item style={{ marginBottom: 30 }} picker>
                        <Left>
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                }}
							>Enter number of sacs (optional): </Text>
                        </Left>
                        <Right>
                            <Item regular>
								<Input
									keyboardType="numeric"
									name="sacs"
									style={{height: 40, color: 'black' }}
									value={ sacs }
									onChangeText={(sacs) => this.updateSacsQuantity(sacs)}
								/>
							</Item>
                        </Right>
                    </Item>
					<Item style={{ marginBottom: 30 }} picker>
						<Left>
							<Text
                                style={{
                                    fontWeight: 'bold',
                                }}
							>Enter price of 1Kg ({ selectedCurrencySymbol }): </Text>
						</Left>
						<Right>
                            <Item regular>
								<Input
									name="quantity"
									keyboardType="numeric"
									style={{height: 40, color: 'black' }}
									value={ unitPrice }
									onChangeText={(price) => this.updateUnitPrice(price)}
								/>
							</Item>
						</Right>
					</Item>
					<Item style={{ marginBottom: 20 }} picker>
						<Left>
							<Text
                                style={{
                                    fontWeight: 'bold',
                                }}
							>Enter date of transaction</Text>
						</Left>
                        <DatePicker
                            modalTransparent={false}
                            animationType={"fade"}
                            placeHolderText="Click to set date"
                            textStyle={{ color: "green" }}
                            placeHolderTextStyle={{
                                color: "#fff",
                                backgroundColor: 'green',
                                borderRadius: 10
                            }}
                            onDateChange={(text) => { this.setState({ date:  moment(text).format('l')}) }}
                        />
					</Item>{/*
					<Item style={{ marginBottom: 30, marginTop: 15 }} picker>
						<Left>
							<Text>Status: </Text>
						</Left>
						<Picker
							mode="dropdown"
							placeholder="Select status"
							placeholderStyle={{ color: '#bfc6ea' }}
							style={{ width: 120 }}
							selectedValue={status}
							onValueChange={this.onStatusChange.bind(this)}
						>
							<Picker.Item label='-- Select status --' value={-1} />
							<Picker.Item label='collected' value='collected' key='collected' />
							<Picker.Item label='shipped' value='shipped' key='shipped' />
						</Picker>
					</Item>*/}
					{/*
					<Item style={{ marginBottom: 30 }}>
						<Left>
							<Text>Use custom price</Text>
						</Left>
						<Radio
							name="useCustomPrice"
							selected={useCustomPrice}
							selectedColor={'#3fa044'}
							onPress={this.onUseCustomPrice}
						/>
					</Item>
					*/}
					{ /*
						useCustomPrice === true && (<Item style={{ marginBottom: 30 }}>
							<Label>Custom unit price: </Label>
							<Input
								name="customPrice"
								style={{height: 40, color: 'black' }}
								value={ customPrice }
								onChangeText={(customPrice) => this.onCustomPriceChange(customPrice)}
							/>
						</Item>)
						*/
					}

					<Item style={{ marginBottom: 30 }} picker>
						<Left>
							<Text
                                style={{
                                    fontWeight: 'bold',
                                }}
							>Enter amount paid to seller ({ selectedCurrencySymbol }): </Text>
						</Left>
						<Right>
                            <Item regular>
								<Input
									keyboardType="numeric"
									name="amountPaid"
									style={{height: 40, color: 'black' }}
									value={ amountPaid }
									onChangeText={(amount) => this.updateAmountPaid(amount)}
								/>
							</Item>
						</Right>
					</Item>
					<Item style={{ marginBottom: 30, fontSize: 20 }} picker>
						<Left>
							<Text
                                style={{
                                    fontWeight: 'bold',
									fontSize: 20,
									color: 'brown',
                                }}
							>Total cost: </Text>
						</Left>
						<Right>
                            <Text
                                style={{
                                    fontWeight: 'bold',
									color: 'brown',
                                    fontSize: 20,
                                }}
							>{selectedCurrencySymbol} { parseFloat(unitPrice) * parseFloat(quantity) || 0 }</Text>
							{ /*
								useCustomPrice === true && (
									<Text>{selectedCurrencyName} { parseFloat(customPrice) * parseFloat(quantity) }</Text>
								)
								*/
							}
						</Right>
					</Item>

					<Button success block style={{ margin: 40, borderRadius: 20 }}
						onPress={() => this.savePurchase()}
					>
						<Text>Save purchase</Text>
					</Button>
				</Form>
				{/*
				<Dialog.Container visible={dialogVisible}>
					<Dialog.Title>Confirm transaction</Dialog.Title>
					<Dialog.Description>
            Do you want use custom price?
					</Dialog.Description>
					<Dialog.Button label="Cancel" onPress={this.hideDialog} />
					<Dialog.Button label="Ok" onPress={this.saveCustomPurchase} />
				</Dialog.Container>
				*/}
			</Content>
		);
	}
}

function mapStateToProps(state) {
	const { user, products, currencies } = state;
	return {
		products,
		user,
		currencies,
	};
}

export default connect(mapStateToProps)(Buy);
