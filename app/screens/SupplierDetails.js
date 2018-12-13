import React, { PureComponent } from 'react';
import { Button, Content, Container, Text } from 'native-base';

class SupplierDetails extends PureComponent {
	buyFrom(user){
		this.props.navigation.navigate('Buy', { ...user });
	}

	viewTransactions(user){
		this.props.navigation.navigate('Transactions', { ...user });
	}

    viewSupplierDetails(user){
        this.props.navigation.navigate('SupplierInfo', { ...user });
    }

	render() {
		const { firstName } = this.props.navigation.state.params;

		return (
			<Container>
				<Content>
					<Button success block style={{ margin: 40, borderRadius: 5 }}
						onPress={() => this.buyFrom(this.props.navigation.state.params)}
					>
						<Text>Click to Buy from { firstName}</Text>
					</Button>
					<Button primary block style={{ margin: 40, borderRadius: 5 }}
						onPress={() => this.viewTransactions(this.props.navigation.state.params)}
					>
						<Text>Click to view transactions</Text>
					</Button>
                    <Button info block style={{ margin: 40, borderRadius: 5 }}
                            onPress={() => this.viewSupplierDetails(this.props.navigation.state.params)}
                    >
                        <Text>Click to read about { firstName }</Text>
                    </Button>
				</Content>
			</Container>
		);
	}
}

export default SupplierDetails;
