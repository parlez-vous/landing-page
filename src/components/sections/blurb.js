import React from 'react'
import styled from "styled-components"
import { Container } from "../global"

export default () =>
  <ParagraphContainer>
    <Text>Hey you,</Text>
    <Text>I know exactly how you feel.</Text>
    <Text>You just want a <strong>good</strong> commenting system that doesn't inexplicably require <strong>over 1MB of data</strong> to work.</Text>
    <Text>But also, ideally you don't need to host your own. Who has the time (or money) to ensure your self-hosted commenting system doesn't break ... or worse yet; leak user data 😱.</Text>
    <Text>And ...</Text>
    <Text>... In a perfect world ...</Text>
    <Text>Just maybe ...</Text>
    <br />
    <br />
    <Text>It's <Money>free</Money> to use?</Text>
    <br />
    <br />
    <Text>... And the best part:</Text>
    <br />
    <h3>Your data is <strong>yours.</strong> Period.</h3>
  </ParagraphContainer>

const Text = styled.p`
  color: ${props => props.theme.color.primary};
`

const Money = styled.span`
  color: #098c8c;
  font-weight: bolder;
`

const ParagraphContainer = styled(Container)`
  max-width: 600px;
`

