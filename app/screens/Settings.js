import React, { PureComponent } from 'react';
import { Content, Container, List, ListItem, Text, Icon, Body, Right } from 'native-base';
import { connect } from 'react-redux';

const Settings = React.memo(function Settings(props) {
	return (
		<Container>
			<Content>
				<List>
					<ListItem onPress={() => props.navigation.navigate('SitesDownloader') } iconRight>
						<Body>
							<Text>Download sites</Text>
						</Body>
						<Right><Icon active name="cloud-download" style={{fontSize: 20, color: 'blue'}}/></Right>
					</ListItem>
					<ListItem onPress={() => props.navigation.navigate('Profile') } iconRight>
						<Body>
							<Text>View your details</Text>
						</Body>
						<Right><Icon active name="person" style={{fontSize: 20, color: 'grey'}} /></Right>
					</ListItem>
					<ListItem onPress={() => props.navigation.navigate('Login') } iconRight>
						<Body>
							<Text color='danger'>Sign Out</Text>
						</Body>
						<Right color='danger'>
							<Icon active name="ios-close-circle" style={{fontSize: 20, color: 'red'}} />
						</Right>
					</ListItem>
				</List>
			</Content>
		</Container>
	);
});



export default connect()(Settings);
