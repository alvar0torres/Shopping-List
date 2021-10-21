import Card from "../UI/Card";
import Card2 from "../UI/Card2";
import { useSelector } from 'react-redux';

import classes from "./List.module.css";

const List = () => {

  const lista = useSelector( state => state.list.list );
  
  return (
    <Card>
      <ul className={classes.list}>
        {lista.map((item) => (
          <Card2 key={item.id}>
            <li>{item.text}</li>
          </Card2>
        ))}
      </ul>
    </Card>
  );
};

export default List;
