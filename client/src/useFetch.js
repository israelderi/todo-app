import { useEffect, useState } from "react";
import axios from 'axios';

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);

    useEffect(()=> {
        const fetch = async () => {
            try{
                const res = await axios.get(url);
                setData(res.data);
            }catch (err) {
                setError(err);
            }
        }
        fetch();
    }, [])

    const reFetch = async () => {
        try {
          const res = await axios.get(url);
          setData(res.data);
        } catch (err) {
          setError(err);
        }
      };
    
      return { data, error, reFetch };
};

export default useFetch;
