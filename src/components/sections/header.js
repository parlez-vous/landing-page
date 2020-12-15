import React, { useState } from "react"
import styled, { keyframes } from "styled-components"

import { Container } from "../global"

const Header = () => {
  const [formState, setFormState] = useState({
    submitting: false,
    email: '',
    message: null,
  })

  const handleSubmit = event => {
    event.preventDefault()

    setFormState({ ...formState, submitting: true })

    fetch('https://us-central1-newsletter-app-190ba.cloudfunctions.net/newsletter/subscribe?list=parlezvous', {
      method: 'post',
      body: JSON.stringify({ email: formState.email }),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      setFormState({ ...formState, submitting: false })

      if (response.status === 200) {
        setFormState({ ...formState, message: 'You\'re now subscribed!' })
      } else {
        setFormState({ ...formState, message: 'Opps! Something went wrong.' })
      }
    })
  }

  return (
    <HeaderWrapper id="top">
      <Container>
        <Flex>
          <HeaderTextGroup>
            <h1>
              Enable Discussions;
              <br />
              Maintain Your Privacy
            </h1>
            <h2>
              Fast and Full of Great Features.
            </h2>
            <HeaderForm onSubmit={handleSubmit}>
              <HeaderInput
                placeholder="Your email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
              />
              <FormButtonContainer>
                <HeaderButton>
                  <span style={{ visibility: formState.submitting ? 'hidden' : 'visible' }}>Request Access</span>
                  <LoadingDonut formSubmitting={formState.submitting} />
                </HeaderButton>
                { formState.message &&
                    <FormMessage>{formState.message}</FormMessage>
                }
              </FormButtonContainer>
            </HeaderForm>
            <FormSubtitle>
              Already have a beta account?{" "}
              <FormSubtitleLink href="https://app.parlezvous.io/signin" target="_blank">Sign in</FormSubtitleLink>
            </FormSubtitle>
          </HeaderTextGroup>
        </Flex>
      </Container>
    </HeaderWrapper>
  )
}

export default Header


const FormButtonContainer = styled.div`
  margin-left: 8px;
  position: relative;

  @media (max-width: ${props => props.theme.screen.xs}) {
    margin-left: 0;

    display: flex;
    justify-content: space-between;

    & > span {
      position: inherit;
      width: inherit;
    }
  }
`

const FormMessage = styled.span`
  color: #098c8ca6;
  position: absolute;
  display: inline-block;
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
  width: 100%;
}
`

const HeaderWrapper = styled.header`
  background-color: #f8f8f8;
  padding: 160px 0 80px 0;
  position: relative;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 5vw));
  @media (max-width: ${props => props.theme.screen.md}) {
  }
`

const HeaderTextGroup = styled.div`
  margin: 0;

  > div {
    width: 120%;
    margin-bottom: -4.5%;

    @media (max-width: ${props => props.theme.screen.md}) {
      margin: 0 16px;
    }
  }

  h1 {
    margin: 0 0 24px;
    color: ${props => props.theme.color.primary};
  }

  h2 {
    margin-bottom: 24px;
    ${props => props.theme.font_size.regular}
  }

  p {
    margin-bottom: 48px;
  }
`

const Flex = styled.div`
  display: grid;
  justify-content: space-between;
  align-content: center;
  grid-template-columns: 1fr 1fr;
  @media (max-width: ${props => props.theme.screen.md}) {
    grid-template-columns: 1fr;
    grid-gap: 64px;
  }
`


const donutSpin = keyframes`
  0% {
      transform: rotate(0deg);
  }

  100% {
      transform: rotate(360deg);
  }
`

const LoadingDonut = styled.span`
  display: ${props => props.formSubmitting ? 'inline-block' : 'none'};
  position: absolute;
  top: 15px;
  right: 42%;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: rgb(208, 208, 208);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: ${donutSpin} 1.2s linear infinite;
`

const HeaderForm = styled.form`
  display: flex;
  flex-direction: row;
  padding-bottom: 16px;

  @media (max-width: ${props => props.theme.screen.sm}) {
    flex-direction: column;
  }
`

const FormSubtitle = styled.span`
  ${props => props.theme.font_size.xxsmall}
`

const FormSubtitleLink = styled.a`
  color: ${props => props.theme.color.secondary};
  padding-bottom: 1px;
  margin-left: 8px;
  text-decoration: none;
  border-bottom: 1px solid ${props => props.theme.color.secondary};
`

const HeaderInput = styled.input`
  font-weight: 500;
  font-size: 16px;
  color: ${props => props.theme.color.primary};
  line-height: 42px;
  width: 100%;
  text-align: left;
  height: 60px;
  border-width: 1px;
  border-style: solid;
  border-color: ${props => props.theme.color.secondary};
  border-image: initial;
  border-radius: 4px;
  padding: 8px 16px;
  outline: 0px;
  &:focus {
    box-shadow: inset ${props => props.theme.color.secondary} 0px 0px 0px 2px;
  }
  @media (max-width: ${props => props.theme.screen.md}) {
    margin-bottom: 8px;
  }
  @media (max-width: ${props => props.theme.screen.sm}) {
    display: block;
    width: 100%;
  }
`

const HeaderButton = styled.button`
  font-weight: 500;
  position: relative;
  font-size: 14px;
  color: white;
  letter-spacing: 1px;
  height: 60px;
  display: block;
  text-transform: uppercase;
  cursor: pointer;
  white-space: nowrap;
  background: ${props => props.theme.color.secondary};
  border-radius: 4px;
  padding: 0px 40px;
  border-width: 0px;
  border-style: initial;
  border-color: initial;
  border-image: initial;
  outline: 0px;
  &:hover {
    box-shadow: rgba(110, 120, 152, 0.22) 0px 2px 10px 0px;
  }
  @media (max-width: ${props => props.theme.screen.md}) {
  }
  @media (max-width: ${props => props.theme.screen.sm}) {
    margin-left: 0;
  }
`

