"use client";
import { useState, useEffect } from 'react';
import AWS from 'aws-sdk';

const SortOptions = ({ onChange }) => {
  const options = ['created_at_asc', 'filename_asc', 'filename_desc'];

  return (
    <select onChange={(e) => onChange(e.target.value)} className="bg-gray-900 text-white rounded p-2">
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

const IndexPage = () => {
  const [items, setItems] = useState([]);
  const [sort, setSort] = useState('created_at_asc');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [sort]);

  const fetchData = async () => {
    setLoading(true); // Set loading to true when fetching data
    try {
      // Set your AWS credentials
      const credentials = new AWS.Credentials({
        accessKeyId: 'AKIAUGKCGDOFEKQJMFKF',
        secretAccessKey: 'tHge/ZhvUxY8Ai/TztqfOObGFylOiAXxcBRjT2c4'
      });

      // Create an AWS Lambda service object
      const lambda = new AWS.Lambda({
        credentials: credentials,
        region: 'ap-south-1' // e.g., 'us-west-2'
      });

      // Define the parameters for the Lambda function invocation
      const params = {
        FunctionName: 'sora20',
        Payload: JSON.stringify({ sort })
      };

      // Call the Lambda function
      const data = await lambda.invoke(params).promise();
      const parsedData = JSON.parse(data.Payload);

      setItems(parsedData.body);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-white mb-4">Sort Options</h1>
      <SortOptions onChange={setSort} />
      {loading ? (
        <p className="text-white">Please wait...</p>
      ) : (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Items</h2>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
              <li key={index} className="bg-gray-800 rounded p-4 text-white">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default IndexPage;
