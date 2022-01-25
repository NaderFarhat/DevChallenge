import React, { useEffect, useState } from "react";
import mainLogo from "../../assets/github-logo.png";
import { Select, Row, Col } from "antd";
import Card from "../../components/Card/Card";

import { fetchRepositories } from "../../services/integrationApi";

const { Option } = Select;

const Home: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [data, setData] = React.useState<any>([]);

  const handleFetchRepositories = (language: string) => {
    fetchRepositories(language)
      .then((res) => {
        setData(res.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onChange = (e: string) => {
    handleFetchRepositories(e);
  };

  useEffect(() => {
    handleFetchRepositories(selectedLanguage);
  }, []);

  useEffect(() => {
    handleFetchRepositories(selectedLanguage);
  }, [selectedLanguage]);

  return (
    <div>
      <div>
        <img src={mainLogo} alt="fireSpot" />
      </div>
      <div>
        <Select
          showSearch
          placeholder="Select a person"
          optionFilterProp="children"
          onChange={onChange}
          //   onSearch={onSearch}
          //   filterOption={(input, option) =>
          //     option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          //   }
        >
          <Option value="java">Java</Option>
          <Option value="python">Python</Option>
          <Option value="javascript">Javascript</Option>
          <Option value="typescript">Typescript</Option>
          <Option value="ruby">Ruby</Option>
        </Select>

        {console.log("data", data)}

        <Row gutter={[48, 48]}>
          {" "}
          {data.map((item: any) => {
            // console.log("item", item);
            return (
              <Col span={6}>
                <Card {...item} />
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
};

export default Home;
