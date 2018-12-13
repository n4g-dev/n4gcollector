import React, { PureComponent } from 'react';
import { List, ListItem, Content, Container, Text } from 'native-base';

class SupplierInfo extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            firstName,
            lastName,
            phoneNumber,
            about,
            birthDate,
            gender,
            district,
            community,
            organization,
            membershipCode,
        } = this.props.navigation.state.params;

        return (
            <Container>
                <Content>
                    <List>
                        <ListItem itemDivider>
                            <Text style={{ fontWeight: 'bold' }}>Personal Information</Text>
                        </ListItem>
                        <ListItem>
                            <Text>First name:     {firstName}</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Last name:     {lastName}</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Membership code:     {membershipCode}</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Gender:     {gender}</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Phone number:     {phoneNumber}</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Date of birth:     {birthDate}</Text>
                        </ListItem>
                        <ListItem>
                            <Text>About:     {about}</Text>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text style={{ fontWeight: 'bold' }}>Location</Text>
                        </ListItem>
                        <ListItem>
                            <Text>District:     {district}</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Community:     {community}</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Organization:     {organization}</Text>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
}

export default SupplierInfo;
