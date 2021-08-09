import { GLGraph } from 'GLGraph/GLGraph';
import { Fixture } from './cosmos.decorator';

function calendar() {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  return (unix: number) => {
    const date = new Date(unix);

    return `${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;
  };
}

function money(symbol: string, currency: string, decimals = 0) {
  return (value: number) => `${symbol}${value.toFixed(decimals)} ${currency}`;
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
        { x: 1631764800000, y: 101000 },
      ]}
      domain={undefined}
      range={25000}
      grid={[
        { label: '$25K', y: 25000 },
        { label: '$45K', y: 45000 },
        { label: '$65K', y: 65000 },
        { label: '$85K', y: 85000 },
        { label: '$105K', y: 105000 },
      ]}
      bezier={8}
      stroke={2.5}
      tint="#343A40"
      background="#FFF"
      gradient={false}
      reactive="point+xy"
      labelX={calendar()}
      labelY={money('$', 'CAD')}
    />
  </Fixture>
);

const AAPL = (
  <Fixture height={250} width={400} background="#000">
    <GLGraph
      view={{ x: 400, y: 250 }}
      data={[
        { x: 1650375045000, y: 196.02 },
        { x: 1650375945000, y: 196.87 },
        { x: 1650376845000, y: 194.7 },
        { x: 1650377745000, y: 195.21 },
        { x: 1650378645000, y: 197.04 },
        { x: 1650379545000, y: 198.49 },
        { x: 1650380445000, y: 199.0 },
        { x: 1650381345000, y: 202.46 },
        { x: 1650382245000, y: 201.98 },
        { x: 1650383145000, y: 203.66 },
        { x: 1650384045000, y: 199.84 },
        { x: 1650384945000, y: 199.69 },
        { x: 1650385845000, y: 199.17 },
        { x: 1650386745000, y: 200.14 },
        { x: 1650387645000, y: 200.04 },
        { x: 1650388545000, y: 201.7 },
        { x: 1650389445000, y: 199.96 },
        { x: 1650390345000, y: 196.6 },
        { x: 1650391245000, y: 200.16 },
        { x: 1650392145000, y: 200.7 },
      ]}
      domain={23400000}
      range={16}
      grid={[
        { label: '194', y: 194 },
        { label: '197', y: 197 },
        { label: '200', y: 200 },
        { label: '203', y: 203 },
        { label: '206', y: 206 },
      ]}
      bezier={0}
      stroke={2}
      tint="#FFF"
      background="#000"
      gradient
      reactive="point+y"
      labelX={undefined}
      labelY={money('$', 'USD', 2)}
    />
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
      domain={undefined}
      range={undefined}
      grid={[
        { label: '100K', y: 100000 },
        { label: '250K', y: 250000 },
        { label: '400K', y: 400000 },
      ]}
      bezier={6}
      stroke={2.5}
      tint="#07F"
      background="#21262B"
      gradient
      reactive="point+x"
      labelX={calendar()}
      labelY={undefined}
    />
  </Fixture>
);

const ALOSparkline = (
  <Fixture height={50} width={150} background="#FFF">
    <GLGraph
      view={{ x: 150, y: 50 }}
      data={[
        { x: 0, y: 260 },
        { x: 1, y: 232 },
        { x: 2, y: 226 },
        { x: 3, y: 218 },
        { x: 4, y: 244 },
        { x: 5, y: 247 },
        { x: 6, y: 274 },
        { x: 7, y: 250 },
        { x: 8, y: 269 },
        { x: 9, y: 263 },
        { x: 10, y: 287 },
        { x: 11, y: 280 },
        { x: 12, y: 277 },
        { x: 13, y: 260 },
        { x: 14, y: 286 },
        { x: 15, y: 289 },
        { x: 16, y: 296 },
      ]}
      domain={20}
      range={undefined}
      grid={[]}
      bezier={8}
      stroke={2.75}
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
  'ALO Sparkline': ALOSparkline,
};
