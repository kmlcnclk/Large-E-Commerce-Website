import { Flex } from '@chakra-ui/layout';
import React, { useState } from 'react';
import { BsStar, BsStarFill } from 'react-icons/bs';

function ProductStar({ setStar }) {
  const [a, setA] = useState(<BsStar color="#319795" size={30} />);
  const [b, setB] = useState(<BsStar color="#319795" size={30} />);
  const [c, setC] = useState(<BsStar color="#319795" size={30} />);
  const [d, setD] = useState(<BsStar color="#319795" size={30} />);
  const [e, setE] = useState(<BsStar color="#319795" size={30} />);

  return (
    <Flex justify="center" align="center">
      <Flex
        onMouseLeave={() => {
          setA(<BsStar color="#319795" size={30} />);
          setB(<BsStar color="#319795" size={30} />);
          setC(<BsStar color="#319795" size={30} />);
          setD(<BsStar color="#319795" size={30} />);
          setE(<BsStar color="#319795" size={30} />);
        }}
      >
        <Flex
          onMouseEnter={() => {
            setA(<BsStarFill color="#319795" size={30} />);
          }}
          onClick={() => setStar(1)}
          onMouseLeave={() => {
            setA(<BsStar color="#319795" size={30} />);
            setB(<BsStar color="#319795" size={30} />);
            setC(<BsStar color="#319795" size={30} />);
            setD(<BsStar color="#319795" size={30} />);
            setE(<BsStar color="#319795" size={30} />);
          }}
        >
          {a}
        </Flex>
        <Flex
          onMouseEnter={() => {
            setA(<BsStarFill color="#319795" size={30} />);
            setB(<BsStarFill color="#319795" size={30} />);
          }}
          onClick={() => setStar(2)}
          onMouseLeave={() => {
            setB(<BsStar color="#319795" size={30} />);
            setC(<BsStar color="#319795" size={30} />);
            setD(<BsStar color="#319795" size={30} />);
            setE(<BsStar color="#319795" size={30} />);
          }}
        >
          {b}
        </Flex>
        <Flex
          onMouseEnter={() => {
            setA(<BsStarFill color="#319795" size={30} />);
            setB(<BsStarFill color="#319795" size={30} />);
            setC(<BsStarFill color="#319795" size={30} />);
          }}
          onClick={() => setStar(3)}
          onMouseLeave={() => {
            setC(<BsStar color="#319795" size={30} />);
            setD(<BsStar color="#319795" size={30} />);
            setE(<BsStar color="#319795" size={30} />);
          }}
        >
          {c}
        </Flex>
        <Flex
          onMouseEnter={() => {
            setA(<BsStarFill color="#319795" size={30} />);
            setB(<BsStarFill color="#319795" size={30} />);
            setC(<BsStarFill color="#319795" size={30} />);
            setD(<BsStarFill color="#319795" size={30} />);
          }}
          onClick={() => setStar(4)}
          onMouseLeave={() => {
            setD(<BsStar color="#319795" size={30} />);
            setE(<BsStar color="#319795" size={30} />);
          }}
        >
          {d}
        </Flex>
        <Flex
          onMouseEnter={() => {
            setA(<BsStarFill color="#319795" size={30} />);
            setB(<BsStarFill color="#319795" size={30} />);
            setC(<BsStarFill color="#319795" size={30} />);
            setD(<BsStarFill color="#319795" size={30} />);
            setE(<BsStarFill color="#319795" size={30} />);
          }}
          onClick={() => setStar(5)}
          onMouseLeave={() => {
            setE(<BsStar color="#319795" size={30} />);
          }}
        >
          {e}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default ProductStar;
