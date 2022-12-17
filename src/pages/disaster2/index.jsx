import React, {useEffect} from 'react';
import DisasterList from "../../views/pages/disaster/DisasterList";
import generateClient from "../../utils/axiosClient";

const client = generateClient()
const Disaster2Page = () => {
  const [disasters, setDisasters] = React.useState([]);
  const fetchDisasters = async () => {
    try {
      const response = await client.get('/disasters', {
        params: {
          sort: 'updatedAt:desc',
        }
      })
      setDisasters(response.data.data)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    (async () => {
      await fetchDisasters()
    })();
  }, [])

  return (
    <DisasterList disasters={disasters} />
  );
};

export default Disaster2Page;
