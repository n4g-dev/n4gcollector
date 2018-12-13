import React, { PureComponent } from 'react';
import { Image } from 'react-native';
import {
	Container,
	Content,
	Button,
	Form,
	Card,
	CardItem,
	Item,
	Label,
	Input,
	Text,
	Toast } from 'native-base';
import { connect } from 'react-redux';
import { index, setActiveUser } from '../state/actions';


class LoginScreen extends PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			signing: false,
			phone: '',
			password: ''
		};

		this.login = this.login.bind(this);
	}

	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(index('users', {}));
	}

	login() {
		const { users, dispatch } = this.props;
		const { phone, password } = this.state;
		this.setState({
			signing: true
		});

		if (phone.length < 10) {
            return Toast.show({
                text: 'Phone number is wrong',
				type: 'danger',
                buttonText: 'Okay'
            });
		}
		if (password.length < 6) {
            return Toast.show({
                text: 'Password is wrong',
				type: 'danger',
                buttonText: 'Okay'
            });
		}
		const foundUser = users.find(aUser => aUser.password === password && aUser.phone === phone);
		if (foundUser && foundUser.firstName && foundUser.lastName) {
            this.setState({
                signing: false,
                phone: '',
                password: ''
            });
			dispatch(setActiveUser(foundUser));
			this.props.navigation.navigate('Suppliers');
		} else {
            return Toast.show({
                text: 'There is no user with such details',
				type: 'warning',
                buttonText: 'Okay'
            });
		}
	}

	render() {
		const { phone, password } = this.state;


		return (
			<Container style={{ backgroundColor: '#FFF' }}>
				<Content>
					<Image
						block
						style={{
							marginTop: 30,
							marginBottom: 40,
							marginLeft: 'auto',
							marginRight: 'auto',
							height: 200,
							width: 300,
							flex: 1
						}}
						source={require('../../resources/images/logo-min.png')}
					/>
					<Text style={{ textAlign: 'center', color: 'green' }}>
          N4G Collector Tool
					</Text>
					<Card
						style={{
							width: '95%',
							alignSelf: 'center',
							borderColor: 'grey',
							borderWidth: 3
						}}>
						<CardItem>
							<Form style={{ width: '100%' }}>
								<Item floatingLabel style={{ marginBottom: 20 }}>
									<Label>Phone number</Label>
									<Input
                                        keyboardType="numeric"
										name="phone"
										value={ phone }
										onChangeText={(text) => this.setState({ phone: text })}
									/>
								</Item>
								<Item floatingLabel>
									<Label>Password</Label>
									<Input
										name="password"
										value={ password }
										secureTextEntry={true}
										onChangeText={(text) => this.setState({ password: text })}
									/>
								</Item>
								<Button success block style={{ margin: 40, marginBottom: 20, borderRadius: 20 }}
									onPress={() => this.login()}
								>
									<Text>Sign In</Text>
								</Button>
							</Form>
						</CardItem>
					</Card>
				</Content>
			</Container>
		);
	}
}


function mapStateToProps(state) {
	const { user, users } = state;
	return {
		user,
		users
	};
}


export default connect(mapStateToProps)(LoginScreen);
