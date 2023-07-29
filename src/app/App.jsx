import './App.scss';
import { Routes,Route} from 'react-router-dom';
import {routers} from 'router/router'

function App() {
  return (
    <Routes>
    {routers.map((r, idx) => {
      if (r.children && r.children.length > 0) {
        return (
          <Route path={r.path} element={r.element} key={idx}>
            {r.children.map((rc, index) => {
              if (rc.isRoot) {
                return <Route index element={rc.element} key={index} />;
              }

              return (
                <Route path={rc.path} element={rc.element} key={index} />
              );
            })}
          </Route>
        );
      }

      return <Route path={r.path} element={r.element} key={idx} />;
    })}
  </Routes>
  );
}

export default App;
