import snapshotSerializerAnsi from 'jest-snapshot-serializer-ansi';

import './src/extend-expect';

expect.addSnapshotSerializer(snapshotSerializerAnsi);
