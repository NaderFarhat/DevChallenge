import React from "react";
import { Avatar, Row, Col, Typography } from "antd";

import { Container, Header, Content, Footer } from "./styles";

const { Title } = Typography;

const Card: React.FC = (props: any) => (
  <Container>
    <Header>
      <Row>
        <Col>
          <Avatar
            size={116}
            src={
              props && props.owner && props.owner.avatar_url
                ? props.owner.avatar_url
                : undefined
            }
            data-testid="avatar"
          />
        </Col>
        <Col>
          <Row>
            <h1 className="title_card">{props && props.name}</h1>
          </Row>
          <Row>
            <h1 className="subTitle_card">Created by &nbsp;</h1>
            <span className="subTitle_card-name">
              {props && props.owner && props.owner.login}
            </span>
          </Row>
        </Col>
      </Row>
    </Header>
    <Content>
      <Title className="description_card" ellipsis>
        {props.description}
      </Title>
    </Content>
    <Footer>
      <Row>
        <Col className="col_footer">
          <span className="number_footer">{props && props.forks}</span>{" "}
          <span className="title_footer" data-testid="forks">
            FORKS
          </span>
        </Col>
        <Col className="col_footer">
          <span className="number_footer">
            {props && props.stargazers_count}
          </span>{" "}
          <span className="title_footer" data-testid="stars">
            STARS
          </span>
        </Col>
      </Row>
    </Footer>
  </Container>
);

export default Card;
