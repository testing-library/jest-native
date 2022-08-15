import './src/extend-expect';
import { plugins } from 'pretty-format';

expect.addSnapshotSerializer(plugins.ConvertAnsi);
