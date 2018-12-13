import React, { PureComponent } from 'react';
import {
	Text, Icon, Header, Item, Input, Button,
	Container, Content,
} from 'native-base';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { index } from '../state/actions';
import { List, ListItem } from 'react-native-elements';

class Suppliers extends PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			searchEntry: ''
		};

		this.updateSearchEntry = this.updateSearchEntry.bind(this);
	}

	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(index('suppliers', {}));
	}

	onLearnMore(supplier) {
		this.props.navigation.navigate('SupplierDetails', { ...supplier });
	}

	updateSearchEntry(event) {
		const searchEntry = event.target.value;
		this.setState({
			searchEntry,
		});
	}

	render() {
		const { searchEntry } = this.state;
		const { suppliers } = this.props;
		let filteredSuppliers = [];

		if (searchEntry.length > 1) {
			filteredSuppliers= suppliers.filter(supplier =>
				supplier.firstName.toLowerCase().indexOf(searchEntry.toLowerCase()) !== -1 ||
                supplier.lastName.toLowerCase().indexOf(searchEntry.toLowerCase()) !== -1 ||
				supplier.membershipCode.toLowerCase().indexOf(searchEntry.toLowerCase()) !== -1
			);
		} else {
			filteredSuppliers = suppliers;
		}

		return (
			<Container>
                <Header searchBar rounded style={{ backgroundColor: '#DCDCDC' }}>
                    <Item>
                        <Icon name="ios-search" />
                        <Input
                            onChangeText={(searchEntry) => this.setState({searchEntry})}
                            onClearText={(searchEntry) => this.setState({searchEntry})}
							placeholder="Enter membership-code or name"
						/>
                        <Icon name="ios-people" />
                    </Item>
                    <Button transparent>
                        <Text>Search</Text>
                    </Button>
                </Header>
				<Content>
                        {
                            searchEntry.length > 1 && filteredSuppliers.length === 0 ?
								<Text
									style={{
										marginTop: 50, textAlign: 'center', fontSize: 18, color: 'brown'
									}}
								>
									No suppliers match {searchEntry}
								</Text> :
                                <List>
									<FlatList
										data={filteredSuppliers}
										keyExtractor={item => item.membershipCode}
										renderItem={({item}) => (
											<ListItem
												roundAvatar
												title={`${item.firstName} ${item.lastName} (${item.membershipCode})`}
												subtitle={`${item.community}`}
												avatar={{uri: 'nopicnow'}}
												onPress={() => this.onLearnMore(item)}
											/>
										)}
									/>
								</List>
                        }
				</Content>
			</Container>
		);
	}
}

function mapStateToProps(state) {
	const { suppliers, user } = state;
	return {
		suppliers,
		user,
	};
}

export default connect(mapStateToProps)(Suppliers);
