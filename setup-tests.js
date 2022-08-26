import ansiEscapesSerializer from 'jest-serializer-ansi-escapes';

import './src/extend-expect';

expect.addSnapshotSerializer(ansiEscapesSerializer);
