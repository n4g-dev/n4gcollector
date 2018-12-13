import React, { PureComponent } from 'react';
import { Container, Content, Text, ListDivider, Button, Label, Item } from 'native-base';
import { connect } from 'react-redux';
import { downloadSites } from '../state/actions';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Alert from '../components/Alert';
import api from '../api';

class SitesDownloader extends PureComponent {

	constructor(props) {
		super(props);

		this.state = {
			community: undefined,
			region: undefined,
			district: undefined,
			selectedRegions: [],
			selectedDistricts: [],
			selectedCommunities: [],
			communities: [],
			regions: [],
			districts: [],
		};

		this.onSelectedRegionsChange = this.onSelectedRegionsChange.bind(this);
		this.onSelectedCommunitiesChange = this.onSelectedCommunitiesChange.bind(this);
		this.onSelectedDistrictsChange = this.onSelectedDistrictsChange.bind(this);
		this.saveSites = this.saveSites.bind(this);
	}

	componentDidMount() {
		api.service('regions').find().then((regions) => {
			this.setState({
				regions: regions.data
			});
		});

	}

	onSelectedRegionsChange(selectedRegions) {
		const { selectedDistricts, selectedCommunities } = this.state;
		this.setState({ selectedRegions });
		if (selectedRegions.length > 0) {
			api.service('districts').find({query: {regionId: { $in: selectedRegions }}}).then((districts) => {
				this.setState({
					districts: districts.data
				});
			});
		}
		const filteredSelectedDistricts = selectedDistricts
			.filter(district => selectedRegions.includes(district.regionId) === true);
		// this.onSelectedDistrictsChange(filteredSelectedDistricts);
		this.setState({ districts: filteredSelectedDistricts });
		const filteredSelectedCommunities = selectedCommunities
			.filter(community => selectedDistricts.includes(community.districtId) === true);
		// this.onSelectedCommunitiesChange(filteredSelectedCommunities);
		this.setState({ communities: filteredSelectedCommunities });
	}

	onSelectedDistrictsChange(selectedDistricts){
		const { communities } = this.state;
		this.setState({ selectedDistricts });
		if (selectedDistricts.length > 0) {
			api.service('communities').find({query: {districtId: { $in: selectedDistricts } }}).then((communities) => {
				this.setState({
					communities: communities.data
				});
			});
		}
		const filteredSelectedCommunities = communities
			.filter(community => selectedDistricts.includes(community.districtId) === true);
		// this.onSelectedCommunitiesChange(filteredSelectedCommunities);
		this.setState({ communities: filteredSelectedCommunities });
	}

	onSelectedCommunitiesChange(selectedCommunities){
		this.setState({ selectedCommunities });
	}

	saveSites() {
		const { selectedCommunities, selectedDistricts, selectedRegions } = this.state;
		const { dispatch } = this.props;
		if (selectedRegions.length === 0 || selectedDistricts.length === 0 || selectedCommunities.length === 0) {
			alert('Select sites correctly');
			return;
		}
		const sitesConfig = {
			communityIds: selectedCommunities,
			regionIds: selectedRegions,
			districtIds: selectedDistricts
		};

		dispatch(downloadSites(sitesConfig));
		//this.props.navigation.navigate('Login');

	}

	render() {
		const {
			selectedRegions,
			selectedDistricts,
			selectedCommunities,
			communities,
			regions,
			districts
		} = this.state;

		let filteredDistricts = districts.filter(district => selectedRegions.includes(district.regionId) === true);
		let filteredCommunities = communities.filter(community => selectedDistricts.includes(community.districtId) === true);


		return (
			<Container>
				<Content style={{ width: '90%', marginLeft: '5%', marginRight: '5%' }}>
					<Item>
						<Label>Regions</Label>
						<SectionedMultiSelect
							items={regions}
							uniqueKey='id'
							selectText='Choose regions...'
							onSelectedItemsChange={(items) => this.onSelectedRegionsChange(items)}
							selectedItems={selectedRegions}
							itemDivider
						/>
					</Item>
					<Item>
						<Label>Districts</Label>
						<SectionedMultiSelect
							items={filteredDistricts}
							uniqueKey='id'
							selectText='Choose districts...'
							onSelectedItemsChange={(items) => this.onSelectedDistrictsChange(items)}
							selectedItems={selectedDistricts}
						/>
					</Item>
					<Item>
						<Label>Communities</Label>
						<SectionedMultiSelect
							items={filteredCommunities}
							uniqueKey='id'
							selectText='Choose communities...'
							onSelectedItemsChange={(items) => this.onSelectedCommunitiesChange(items)}
							selectedItems={selectedCommunities}
						/>
					</Item>
					<Button
						success
						block
						style={{ margin: 40, borderRadius: 20 }}
						onPress={() => this.saveSites()}
					>
						<Text>Save</Text>
					</Button>
					<Alert/>
				</Content>
			</Container>
		);
	}
}



function mapStateToProps(state) {
	const { user, communities, regions, districts } = state;
	return {
		user,
		communities,
		districts,
		regions,
	};
}


export default connect(mapStateToProps)(SitesDownloader);
