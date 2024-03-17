import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { PapperBlock } from 'enl-components';
import CompossedLineBarArea from './CompossedLineBarArea';
import StrippedTable from '../Table/StrippedTable';
import { firebaseDb } from '../../firebase/firebase';

function BasicTable() {
  const title = brand.name + ' - Dashboard';
  const description = brand.desc;
  const [sales, setSales] = useState(0);

  useEffect(() => {
    const salesRef = firebaseDb.ref('sales');
    salesRef.on('value', snapshot => {
      setSales(snapshot.val());
    });

    // Clean up the subscription
    return () => salesRef.off();
  }, []);

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <PapperBlock title="Statistic Charts" icon="insert_chart" desc="" overflowX>
        <div>
          <CompossedLineBarArea />
          {/* Output field for sales */}
          <div style={{ position: 'absolute', top: '50%', right: '10%' }}>
            <h3>Current Sales: ${sales}</h3>
          </div>
        </div>
      </PapperBlock>
      <PapperBlock title="Table" whiteBg icon="grid_on" desc="UI Table when no data to be shown">
        <div>
          <StrippedTable />
        </div>
      </PapperBlock>
    </div>
  );
}

export default BasicTable;
