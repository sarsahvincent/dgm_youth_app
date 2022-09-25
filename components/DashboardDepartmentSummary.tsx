import { StyleSheet, Text, View } from 'react-native';

const DashboardProfileSummary = (props: {
  name: string;
  leader: string;
  assistant: string;
}) => {
  const leaderName = props?.leader?.split(':')[0];
  const leaderContact = props?.assistant?.split(':')[1];
  const assistantName = props?.assistant?.split(':')[0];
  const assistantContact = props?.assistant?.split(':')[1];

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 14, color: 'green', fontWeight: 'bold' }}>
        {props.name}
      </Text>
      <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10 }}>
        <View style={styles.textContainer}>
          <Text
            style={{
              fontWeight: '600',
              marginVertical: 6,
              color: 'purple',
              fontSize: 14,
            }}
          >
            {leaderName}
          </Text>
          <Text
            style={{
              fontWeight: '600',
              marginVertical: 6,
              color: 'violet',
              fontSize: 14,
            }}
          >
            Role : <Text style={{ color: '#ABB0B8' }}>Leader</Text>{' '}
          </Text>
          <Text
            style={{
              fontWeight: '600',
              marginVertical: 6,
              color: 'violet',
              fontSize: 14,
            }}
          >
            Phone : <Text style={{ color: '#ABB0B8' }}>{leaderContact}</Text>{' '}
          </Text>
        </View>
      </View>

      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={styles.textContainer}>
          <Text
            style={{
              fontWeight: '600',
              marginVertical: 6,
              color: 'purple',
              fontSize: 14,
            }}
          >
            {assistantName}
          </Text>
          <Text
            style={{
              fontWeight: '600',
              marginVertical: 6,
              color: 'violet',
              fontSize: 14,
            }}
          >
            Role : <Text style={{ color: '#ABB0B8' }}>Assistant</Text>{' '}
          </Text>
          <Text
            style={{
              fontWeight: '600',
              marginVertical: 6,
              color: 'violet',
              fontSize: 14,
            }}
          >
            Phone : <Text style={{ color: '#ABB0B8' }}>{assistantContact}</Text>{' '}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default DashboardProfileSummary;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: 'center',
    flex: 1,
    width: 250,
    height: 250,
    marginTop: 20,
    widthborderRadius: 10,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 15,
    shadowColor: '#52006A',
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 30,
  },
  textContainer: {
    flex: 1,
    width: '100%',
  },
  profileImageContainer: {
    width: 50,
    height: 50,
    borderColor: '#52006A',
    borderWidth: 2,
    borderRadius: 10,
  },
});
