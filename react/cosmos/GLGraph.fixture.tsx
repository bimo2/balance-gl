import { GLGraph } from 'GLGraph/GLGraph';
import { Fixture } from './cosmos.decorator';

function date() {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr',
    'May', 'Jun', 'Jul', 'Aug',
    'Sep', 'Oct', 'Nov', 'Dec',
  ];

  return (unix: number) => {
    const date = new Date(unix);

    return `${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;
  };
}

function money(symbol: string, currency: string) {
  return (value: number) => `${symbol}${value} ${currency}`;
}

const Bitcoin = (
  <Fixture height={275} width={675} background="#FFF">
    <GLGraph
      view={{ x: 675, y: 275 }}
      data={[
        { x: 1606712400000, y: 24000 },
        { x: 1607576400000, y: 18000 },
        { x: 1608440400000, y: 28000 },
        { x: 1609304400000, y: 32000 },
        { x: 1610168400000, y: 50000 },
        { x: 1611032400000, y: 44000 },
        { x: 1611896400000, y: 43000 },
        { x: 1612760400000, y: 60000 },
        { x: 1613624400000, y: 72000 },
        { x: 1614488400000, y: 59000 },
        { x: 1615352400000, y: 73000 },
        { x: 1616212800000, y: 51000 },
        { x: 1617076800000, y: 70000 },
        { x: 1617940800000, y: 74000 },
        { x: 1618804800000, y: 82000 },
        { x: 1619668800000, y: 64000 },
        { x: 1620532800000, y: 71000 },
        { x: 1621396800000, y: 42000 },
        { x: 1622260800000, y: 50000 },
        { x: 1623124800000, y: 47000 },
        { x: 1623988800000, y: 49000 },
        { x: 1624852800000, y: 36000 },
        { x: 1625716800000, y: 37000 },
        { x: 1626580800000, y: 42000 },
        { x: 1627444800000, y: 46000 },
        { x: 1628308800000, y: 67000 },
        { x: 1629172800000, y: 48000 },
        { x: 1630036800000, y: 69000 },
        { x: 1630900800000, y: 60000 },
        { x: 1631764800000, y: 100000 },
      ]}
      grid={[
        { label: '$25K', y: 25000 },
        { label: '$45K', y: 45000 },
        { label: '$65K', y: 65000 },
        { label: '$85K', y: 85000 },
      ]}
      delta={1}
      bezier={8}
      stroke={2.5}
      tint="#343A40"
      background="#FFF"
      gradient={false}
      reactive="point+xy"
      labelX={date()}
      labelY={money('$', 'CAD')}
    />
  </Fixture>
);

const AAPL = (
  <Fixture height={250} width={400} background="#000">
    <GLGraph
      view={{ x: 400, y: 250 }}
      data={[
        { x: 1612155600000, y: 136.86 },
        { x: 1613278800000, y: 126.00 },
        { x: 1614574800000, y: 116.43 },
        { x: 1615780800000, y: 123.29 },
        { x: 1617249600000, y: 124.60 },
        { x: 1618459200000, y: 132.04 },
        { x: 1619841600000, y: 122.77 },
        { x: 1621051200000, y: 126.96 },
        { x: 1622520000000, y: 127.18 },
        { x: 1623729600000, y: 132.70 },
        { x: 1625112000000, y: 149.16 },
        { x: 1626321600000, y: 145.80 },
      ]}
      grid={[
        { label: '112', y: 112 },
        { label: '122', y: 122 },
        { label: '132', y: 132 },
        { label: '142', y: 142 },
        { label: '152', y: 152 },
      ]}
      delta={0.5}
      bezier={0}
      stroke={2}
      tint="#FFF"
      background="#000"
      gradient
      reactive="point+y"
      labelX={undefined}
      labelY={money('$', 'USD')}
    />;
  </Fixture>
);

const FBDownloads = (
  <Fixture height={275} width={450} background="#21262B">
    <GLGraph
      view={{ x: 450, y: 275 }}
      data={[
        { x: 1606798800000, y: 110500 },
        { x: 1609477200000, y: 87250 },
        { x: 1612155600000, y: 214000 },
        { x: 1614574800000, y: 146050 },
        { x: 1617249600000, y: 407750 },
        { x: 1619841600000, y: 196000 },
      ]}
      grid={[
        { label: '100K', y: 100000 },
        { label: '250K', y: 250000 },
        { label: '400K', y: 400000 },
      ]}
      delta={6}
      bezier={6}
      stroke={2.5}
      tint="#07F"
      background="#21262B"
      gradient
      reactive="point+x"
      labelX={date()}
      labelY={undefined}
    />
  </Fixture>
); 

const LULUSparkline = (
  <Fixture height={50} width={150} background="#FFF">
    <GLGraph
      view={{ x: 150, y: 50 }}
      data={[
        { x: 0, y: 248 },
        { x: 1, y: 220 },
        { x: 2, y: 204 },
        { x: 3, y: 140 },
        { x: 4, y: 196 },
        { x: 5, y: 200 },
        { x: 6, y: 248 },
        { x: 7, y: 323 },
        { x: 8, y: 289 },
        { x: 9, y: 399 },
        { x: 10, y: 294 },
        { x: 11, y: 349 },
        { x: 12, y: 326 },
        { x: 13, y: 378 },
        { x: 14, y: 286 },
        { x: 15, y: 401 },
      ]}
      grid={[]}
      delta={2.5}
      bezier={10}
      stroke={3.5}
      tint="#F04"
      background="#FFF"
      gradient={false}
      reactive={undefined}
      labelX={undefined}
      labelY={undefined}
    />
  </Fixture>
);

export default {
  'Bitcoin': Bitcoin,
  'AAPL': AAPL,
  'FB Downloads': FBDownloads,
  'LULU Sparkline': LULUSparkline,
};
