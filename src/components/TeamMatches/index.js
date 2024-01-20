// Write your code here
import {Component} from 'react'
import './index.css'
import LatestMatch from '../LatestMatch'

class TeamMatches extends Component {
  state = {eachMatchDetails: {}}

  componentDidMount() {
    this.getTeamDetails()
  }

  getUpdatedData = obj => ({
    competingTeam: obj.competing_team,
    competingTeamLogo: obj.competing_team_logo,
    date: obj.date,
    firstInnings: obj.first_innings,
    id: obj.id,
    manOfTheMatch: obj.man_of_the_match,
    matchStatus: obj.match_status,
    result: obj.result,
    secondInnings: obj.second_innings,
    umpires: obj.umpires,
    venue: obj.venue,
  })

  getTeamDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    const updatedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: this.getUpdatedData(data.latest_match_details),
      recentMatches: data.recent_matches.map(eachMatch =>
        this.getUpdatedData(eachMatch),
      ),
    }
    this.setState({eachMatchDetails: updatedData})
  }

  render() {
    // const {match} = this.props
    // const {params} = match
    // const {id} = params
    const {eachMatchDetails} = this.state
    const {teamBannerUrl, latestMatchDetails, recentMatches} = eachMatchDetails

    return (
      <div className="team-bg-container">
        <div className="inner-container">
          <img className="team-banner" src={teamBannerUrl} alt="" />
          <LatestMatch matchDetails={latestMatchDetails} />
        </div>
      </div>
    )
  }
}

export default TeamMatches
