import { StyleSheet, Text, View, Dimensions } from 'react-native';

interface Props {
  value: string;
  icon: any;
  title: string;
}

const getWidth = Dimensions.get('screen').width;
const FinanceSummaryComponent = (props: Props) => {
  return (
    <View style={styles.container}>
      <View>{props.icon}</View>
      <View>
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            fontWeight: '600',
            marginBottom: 5,
            textAlign: 'right',
          }}
        >
          {props.title}
        </Text>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: '700' }}>
          {props.value}
        </Text>
      </View>
    </View>
  );
};

export default FinanceSummaryComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    width: getWidth * 0.9,
    height: 90,
    backgroundColor: 'purple',
    borderRadius: 10,
    marginBottom: 5,
  },
});
