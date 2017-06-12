const MOCK_FILES = [
  {
    id: 1,
    filename: 'test.pdf',
    size: '64kb',
    location: 'file://somelocation'
  }, {
    id: 2,
    filename: 'test2.pdf',
    size: '5kb',
    location: 'file://somelocation2'
  }, {
    id: 3,
    filename: 'test3.pdf',
    size: '224kb',
    location: 'file://somelocation3'
  }, {
    id: 4,
    filename: 'test4.pdf',
    size: '56kb',
    location: 'file://somelocation4'
  }
]

export default {
  async getFiles ({ patientId }) {
    return MOCK_FILES
  },

  async deleteFile ({ patientId, fileId }) {
    // TODO: delete file
  }
}
