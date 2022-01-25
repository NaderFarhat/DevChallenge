import React from "react";
import { Avatar, Row, Col } from "antd";

import { Container, Header, Content, Footer } from "./styles";

const Card: React.FC = (props: any) => (
  <Container>
    <Header>
      <Row>
        <Col>
          <Avatar size={64} src={props.owner.avatar_url} />
        </Col>
        <Col>
          <Row>
            <h1 className="title_card">github-cards</h1>
          </Row>
          <Row>
            <h1 className="subTitle_card">Created by &nbsp;</h1>
            <span className="subTitle_card-name">{props.owner.login}</span>
          </Row>
        </Col>
      </Row>
    </Header>
    <Content>
      <h1 className="description_card">{props.description}</h1>
    </Content>
    <Footer>
      <Row>
        <Col className="col_footer">
          <span className="number_footer">{props.forks}</span>{" "}
          <span className="title_footer">FORKS</span>
        </Col>
        <Col className="col_footer">
          <span className="number_footer">{props.stargazers_count}</span>{" "}
          <span className="title_footer">STARS</span>
        </Col>
      </Row>
    </Footer>
  </Container>
);

export default Card;
