import React, { PropTypes } from 'react'
import { VelocityTransitionGroup } from 'velocity-react'
import { GameState, Team, Details } from 'components'
import { mlbTeamProps } from 'helpers/gameProps'
import Plus from 'react-icons/lib/md/add'
import { gameItem, expandIcon, expandedIcon, details } from './styles.css'

const propTypes = {
  game: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  league: PropTypes.string.isRequired,
  expanded: PropTypes.bool.isRequired,
  showDetails: PropTypes.func.isRequired
}

export default function Game({ ...props }) {
  if (props.league === 'mlb') {
    return <MlbGame {...props} />
  }
}

Game.propTypes = propTypes



function MlbGame({ game, date, league, showDetails, expanded }) {
  const awayTeam = mlbTeamProps(game, 'away', league)
  const homeTeam = mlbTeamProps(game, 'home', league)
  const time = 110
  const el = 'flex'
  return (
    <li className={gameItem}>
      <GameState game={game} league={league} />
      <Team {...awayTeam} />
      <Team {...homeTeam} />
      <span className={expanded ? expandedIcon : expandIcon} onClick={showDetails}><Plus /></span>
      <VelocityTransitionGroup className={details} enter={{animation:'slideDown',duration:time,display:el}} leave={{animation:'slideUp',duration:time,display:el}}>
        { expanded && <Details game={game} date={date} league={league} expanded={expanded} /> }
      </VelocityTransitionGroup>
    </li>
  )
}
