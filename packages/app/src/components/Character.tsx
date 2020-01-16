import React from 'react'
import { Card, Image } from 'semantic-ui-react'

interface CharacterProps {
  name: string
  pictureUrl: string
}

const Character = React.memo<CharacterProps>(props => (
  <Card>
    <Image src={props.pictureUrl} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{props.name}</Card.Header>
    </Card.Content>
  </Card>
))

export default Character
