import React, { useEffect, useState } from "react";
import mainLogo from "../../assets/github-logo.png";
import { Select, Row, Col, Spin } from "antd";
import Card from "../../components/Card/Card";
import { Container } from "./styles";

import axios from "axios";

import { fetchRepositories } from "../../services/integrationApi";

const { Option } = Select;

const Home: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<any>(null);
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);

  const handleFetchRepositories = (language: string) => {
    setLoading(true);
    setData([]);
    fetchRepositories(language)
      .then((res) => {
        setData(res.data.items);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const onChange = (e: string) => {
    setSelectedLanguage(e);
    handleFetchRepositories(e);
  };

  useEffect(() => {
    if (data.length > 0) {
      data.map((item: any) => {
        axios({
          method: "post",
          url: "/historic/create",
          headers: {},
          data: {
            language: item.language,
            owner: item.owner.login,
            title: item.name,
            description: item.description,
          },
        });
      });
    }
  }, [data]);

  return (
    <Container>
      <div>
        <img src={mainLogo} alt="fireSpot" data-testid="logo" />
      </div>
      <div className="container_select">
        <Select placeholder="Select a language" onChange={onChange}>
          <Option value="java">Java</Option>
          <Option value="python">Python</Option>
          <Option value="javascript">Javascript</Option>
          <Option value="typescript">Typescript</Option>
          <Option value="ruby">Ruby</Option>
        </Select>
      </div>

      {console.log("data", data)}

      <div className="list_repo" data-testid="list_repo">
        {console.log("loading", loading)}
        {console.log("selectedLanguage", selectedLanguage)}
        {!loading ? (
          <Row gutter={[24, 24]} className="row_list">
            {data.map((item: any) => {
              return (
                <Col span={14}>
                  <Card {...item} />
                </Col>
              );
            })}
          </Row>
        ) : (
          <Spin size="large" />
        )}
      </div>
    </Container>
  );
};

export default Home;
