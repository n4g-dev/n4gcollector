import React from 'react';
import { List, ListItem, Container, Content, Text } from 'native-base';
import { connect } from 'react-redux';


const Profile = React.memo(function Profile(props) {
	const { user } = props;
	return (
		<Container>
			<Content>
				<List>
					<ListItem>
						<Text>First name: { user.firstName }</Text>
					</ListItem>
					<ListItem>
						<Text>Last name: { user.firstName }</Text>
					</ListItem>
					<ListItem>
						<Text>Email: { user.email }</Text>
					</ListItem>
					<ListItem>
						<Text>Since: { user.createdAt }</Text>
					</ListItem>
					<ListItem>
						<Text>Last updated: { user.updatedAt}</Text>
					</ListItem>
				</List>
			</Content>
		</Container>
	);
});



function mapStateToProps(state) {
	const { user } = state;
	return {
		user
	};
}


export default connect(mapStateToProps)(Profile);
