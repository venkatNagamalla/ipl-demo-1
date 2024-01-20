// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import TeamCard from '../TeamCard'

class Home extends Component {
  state = {iplTeamsList: [], isLoading: true}

  componentDidMount() {
    this.getIplTeams()
  }

  getIplTeams = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const {teams} = data
    const updatedData = teams.map(eachTeam => ({
      id: eachTeam.id,
      name: eachTeam.name,
      teamImageUrl: eachTeam.team_image_url,
    }))
    this.setState({iplTeamsList: updatedData, isLoading: false})
  }

  renderTeamsList = iplTeamsList => (
    <ul className="all-teams-container">
      {iplTeamsList.map(eachTeam => (
        <TeamCard teamDetails={eachTeam} />
      ))}
    </ul>
  )

  render() {
    const {iplTeamsList, isLoading} = this.state

    return (
      <div className="home-bg-container">
        <div className="ipl-logo-container">
          <img
            className="ipl-logo"
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
          />
          <h1 className="ipl-logo-heading">IPL Dashboard</h1>
        </div>
        {isLoading ? (
          <div data-testid="loader" className="loading-container">
            <Loader type="Oval" color="#ffffff" height={50} />
          </div>
        ) : (
          this.renderTeamsList(iplTeamsList)
        )}
      </div>
    )
  }
}

export default Home
