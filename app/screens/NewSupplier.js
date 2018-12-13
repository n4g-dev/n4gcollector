import React, { PureComponent } from 'react';
import { Content, Picker, Item, Label, Form, Input, Button, Container, Text, Textarea, DatePicker } from 'native-base';
import moment from 'moment';
import { connect } from 'react-redux';
import { index, createOne } from '../state/actions/';
import Alert from '../components/Alert';

class NewSupplier extends PureComponent {

	constructor(props) {
		super(props);

		this.state = {
			firstName: '',
			lastName: '',
			about: '',
			gender: '',
			phoneNumber: '',
			community: undefined,
			organization: undefined,
			birthDate: '',
			produce: undefined,
		};

		this.saveSupplier = this.saveSupplier.bind(this);
	}

	componentDidMount() {
		const  { dispatch } = this.props;
		dispatch(index('products', {}));
		dispatch(index('organizations', {}));
		dispatch(index('communities', {}));
	}

	onProduceChange(produce) {
		this.setState({ produce });
	}

	onGenderChange(gender) {
		this.setState({ gender });
	}

	saveSupplier(membershipCode) {
		const { dispatch } = this.props;
		const newSupplier = Object.assign({}, this.state);

		if (!this.state.community) {
			return window.alert('Please select community');
		}
        newSupplier.communityId = this.state.community;
        if (!this.state.produce) {
            return window.alert('Please select produce');
        }
		newSupplier.produce = this.state.produce;
        if (!this.state.organization) {
            return window.alert('Please select organization');
        }
		newSupplier.organizationId = this.state.organization;
		newSupplier.membershipCode = membershipCode;
		delete newSupplier.organization;
		delete newSupplier.community;
		dispatch(createOne('suppliers', newSupplier));
		this.setState({
            firstName: '',
            lastName: '',
            about: '',
            gender: '',
            phoneNumber: '',
            community: undefined,
            organization: undefined,
            birthDate: '',
            produce: undefined,
        });
	}

	render() {
		const { products, communities, organizations } = this.props;
		const {
			firstName,
			lastName,
			gender,
			birthDate,
			about,
			community,
			organization,
			produce,
			phoneNumber,
		} = this.state;

		const membershipCode = `${firstName}${community}${birthDate}` || '';

		return (
			<Container style={{ backgroundColor: '#FFF'}}>
				<Content style={{ width: '90%', marginLeft: '5%', marginRight: '5%' }}>
					<Form>
						<Item style={{ marginBottom: 20, marginTop: 20 }}>
							<Label>First name</Label>
							<Input
								name="firstName"
								value={ firstName }
								onChangeText={(text) => this.setState({ firstName: text })}
							/>
						</Item>
						<Item style={{ marginBottom: 20 }}>
							<Label>Last name</Label>
							<Input
								name="lastName"
								value={ lastName }
								onChangeText={(text) => this.setState({ lastName: text })}
							/>
						</Item>
						<Item style={{ marginBottom: 20 }}>
							<Label>Phone number</Label>
							<Input
								name="phone"
								value={ phoneNumber }
								onChangeText={(text) => this.setState({ phoneNumber: text })}
							/>
						</Item>
                        <Item style={{ marginBottom: 20 }}>
                            <Label>Membership code</Label>
                            <Input
								disabled
                                name="membershipCode"
                                value={ membershipCode }
                            />
                        </Item>
						<Item style={{ marginBottom: 20 }}>
							<Textarea
								rowSpan={5}
								style={{ width: '100%' }}
								name='about'
								value={about}
								onChangeText={(text) => this.setState({ about: text })}
								bordered
								placeholder={`About ${firstName}`}
							/>
						</Item>
						<Item style={{ marginBottom: 20 }}>
							<Label>Gender</Label>
							<Picker
								selectedValue={gender}
								style={{ height: 40, marginLeft: 10, marginRight: 10 }}
								onValueChange={this.onGenderChange.bind(this)}>
								<Picker.Item label='-- Select gender --' value={-1} />
								<Picker.Item label="F" value="female" />
								<Picker.Item label="M" value="male" />
							</Picker>
						</Item>
						<Item style={{ marginBottom: 20 }}>
							<Label>Date of birth</Label>
                            <DatePicker
                                modalTransparent={false}
                                animationType={"fade"}
                                placeHolderText="Pick date"
                                textStyle={{ color: "green" }}
                                placeHolderTextStyle={{
                                	color: "#fff",
									backgroundColor: 'green',
									borderRadius: 20
                                }}
                                onDateChange={(text) => { this.setState({ birthDate:  moment(text).format('l')}) }}
                            />
						</Item>
						<Item style={{ marginBottom: 20 }}>
							<Label>Produce: </Label>
							<Picker
								style={{ height: 40, marginLeft: 10, marginRight: 10 }}
								selectedValue={produce}
								onValueChange={this.onProduceChange.bind(this)}
							>
								<Picker.Item label='-- Select produce --' value={-1} key />
								{
									products.map((product) =>
										<Picker.Item label={product.name} value={product.id} key={product.id}/>
									)
								}
							</Picker>
						</Item>
						<Item style={{ marginBottom: 20 }}>
							<Label>Community</Label>
							<Picker
								selectedValue={community}
								style={{ height: 40, marginLeft: 10, marginRight: 10 }}
								onValueChange={(itemValue, itemIndex) => this.setState({ community: itemValue})}>
								<Picker.Item label='-- Select community --' value={-1} />
								{
									communities.map((community) =>
										<Picker.Item label={community.name} value={community.id} key={community.id}/>
									)
								}
							</Picker>
						</Item>
						<Item style={{ marginBottom: 20 }}>
							<Label>Organization</Label>
							<Picker
								selectedValue={organization}
								style={{ height: 40, marginLeft: 10, marginRight: 10 }}
								onValueChange={(itemValue, itemIndex) => this.setState({ organization: itemValue})}>
								<Picker.Item label='-- Select organization --' value={-1} />
								{
									organizations.map((organizations) =>
										<Picker.Item label={organizations.name} value={organizations.id} key={organizations.id}/>
									)
								}
							</Picker>
						</Item>
						<Button success block style={{ margin: 40, borderRadius: 20 }}
							onPress={() => this.saveSupplier(membershipCode)}>
							<Text>Save</Text>
						</Button>
					</Form>
					<Alert/>
				</Content>
			</Container>
		);
	}
}

function mapStateToProps(state) {
	const { products, communities, organizations } = state;
	return {
		products,
		communities,
		organizations
	};
}


export default connect(mapStateToProps)(NewSupplier);
