import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import FinanceSummaryComponent from './FinanceSummaryComponent';
import {
  FontAwesome5,
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { db } from '../firebase';
import {
  doc,
  setDoc,
  collection,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { Select, Center, Box, CheckIcon } from 'native-base';
import Modal from 'react-native-modal';
import { UserContext } from '../context/AuthContext';
const id = Math.random().toString(36).slice(2);

const PaymenetComponent = () => {
  const [success, setSuccess] = useState(false);
  const { getUserDetails } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [selectedSource, setSelectedSource] = React.useState<any>(null);

  //HOOKS TO REQUEST FOR FUNDSF
  const [requestFundsIsModalVisible, setRequestFundsModalVisible] =
    useState(false);
  const toggleRequestFundsModal = () => {
    setRequestFundsModalVisible(!requestFundsIsModalVisible);
  };

  const [allMonthlyDuesRequested, setAllMonthlyDuesRequested] = useState<any>(
    []
  );
  const [allDonConRequested, setAllDonConRequested] = useState<any>([]);

  //HOOKS TO ADD FUNDS
  const [addFundsIsModalVisible, setAddFundsModalVisible] = useState(false);
  const toggleAddFundsModal = () => {
    setAddFundsModalVisible(!addFundsIsModalVisible);
  };

  const [requestedAmount, setRequestedAmount] = useState<any>('');

  const [purposeForRequestedAmount, setPurposeForRequestedAmount] =
    useState<any>('');

  const [amoutToAddfunds, setAmoutToAddfunds] = React.useState<any>(null);
  const [status, setStatus] = React.useState<any>('pending');

  const [totalDues, setTotalDues] = React.useState<any>(0);
  const [totalDonCont, setTotalDonCon] = React.useState<any>(0);
  const [currentBalance, setCurrentBalance] = React.useState<any>(0);
  const [allMonthlyDues, setAllMonthlyDues] = React.useState<any>([]);
  const [allDonationContributions, setAllDonationContributions] =
    React.useState<any>([]);

  const totalDuesCollectiion = collection(
    db,
    'DGM_YOUTH_TotalTotalMonthlyDues'
  );
  const totalDonConCollectiion = collection(
    db,
    'DGM_YOUTH_TotaldonationsContributons'
  );

  const allMonths = collection(db, 'DGM_YOUTH_Funds_monthlyDues');

  const allDonationAndContributions = collection(
    db,
    'DGM_YOUTH_Funds_donationsContributons'
  );
  const allDonationAndContributionsRequests = collection(
    db,
    'DGM_YOUTH_Funds_donationsContributons_request'
  );
  const allMonthsRequests = collection(
    db,
    'DGM_YOUTH_Funds_monthlyDues_request'
  );

  //FUNCTION TO ADD FUNDS MODAL

  const handleAddFunds = async () => {
    if (amoutToAddfunds === null || amoutToAddfunds <= 0) {
      Alert.alert(
        'Alert',
        'Invalid amout! Amount con not be empty or zero (0).',
        [
          {
            text: 'Cancel',

            style: 'cancel',
          },
          { text: 'OK' },
        ]
      );
      return;
    } else if (selectedSource === '') {
      Alert.alert('Alert', 'Please select source to add funds', [
        {
          text: 'Cancel',

          style: 'cancel',
        },
        { text: 'OK' },
      ]);

      return;
    }
    setLoading(true);
    try {
      await setDoc(
        doc(
          db,
          `${
            selectedSource === 'donationsContributons'
              ? 'DGM_YOUTH_Funds_donationsContributons'
              : 'DGM_YOUTH_Funds_monthlyDues'
          }`,
          id + amoutToAddfunds
        ),
        {
          /* firstName, lastName, avatarPath */
          selectedSource,
          amoutToAddfunds,
          createdAt: Math.floor(Date.now() / 1000),
          status,
          addedBy: getUserDetails?.firstName + ' ' + getUserDetails?.lastName,
          picture: getUserDetails?.avatarPath,
        }
      );

      // ALWAYS CREATE THIS TABLE IN THE DATABSE

      if (selectedSource === 'donationsContributons') {
        await updateDoc(
          doc(
            db,
            'DGM_YOUTH_TotaldonationsContributons',
            'donationsContributons'
          ),
          {
            total: totalDonCont + amoutToAddfunds * 1,
          }
        );
      } else {
        await updateDoc(
          doc(db, 'DGM_YOUTH_TotalTotalMonthlyDues', 'TotalMonltyDues'),
          {
            total: totalDues + amoutToAddfunds * 1,
          }
        );
      }
      const data1 = await getDocs(allDonationAndContributions);
      setAllDonationContributions(
        data1.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))
      );
      const data2 = await getDocs(allDonationAndContributionsRequests);
      setAllDonConRequested(
        data2.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))
      );
      const data3 = await getDocs(allMonths);
      setAllMonthlyDues(
        data3.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))
      );

      const data4 = await getDocs(allMonthsRequests);
      setAllMonthlyDuesRequested(
        data4.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))
      );

      const data5 = await getDocs(totalDuesCollectiion);
      setTotalDues(
        data5.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))[0].total
      );

      const data6 = await getDocs(totalDonConCollectiion);
      setTotalDonCon(
        data6.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))[0].total
      );

      const data7 = await getDocs(totalDonConCollectiion);
      const data8 = await getDocs(totalDuesCollectiion);
      setSuccess(!success);
      let grandTotal =
        data7.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))[0].total +
        data8.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))[0].total;

      setCurrentBalance(grandTotal);

      setLoading(false);
      setAmoutToAddfunds('');
      setSelectedSource('');
      Alert.alert('Success', 'Funds Successfully Added.', [
        {
          text: 'Cancel',

          style: 'cancel',
        },
        { text: 'OK' },
      ]);

      toggleAddFundsModal();
    } catch (e) {}
  };

  //FUNCTION TO REQEUST FOR FUNDS
  const handleRequstFounds = async () => {
    if (
      requestedAmount === '' ||
      purposeForRequestedAmount === '' ||
      selectedSource === ''
    ) {
      Alert.alert('Alert', 'All fields required', [
        {
          text: 'Cancel',

          style: 'cancel',
        },
        { text: 'OK' },
      ]);
    } else if (
      requestedAmount * 1 > totalDues * 1 &&
      selectedSource === 'dues'
    ) {
      Alert.alert(
        'Alert',
        'Amount cannot be more than  available Monthly Dues',
        [
          {
            text: 'Cancel',

            style: 'cancel',
          },
          { text: 'OK' },
        ]
      );
    } else if (
      requestedAmount * 1 > totalDonCont * 1 &&
      selectedSource === 'donation/contribution'
    ) {
      Alert.alert(
        'Alert',
        'Amount cannot be more than  available Donation/Contributions',
        [
          {
            text: 'Cancel',

            style: 'cancel',
          },
          { text: 'OK' },
        ]
      );
    } else {
      const data = {
        requestedAmount,
        purposeForRequestedAmount,
        selectedSource,
        status: 'pending',
      };

      setLoading(true);

      try {
        await setDoc(
          doc(
            db,
            `${
              selectedSource === 'donation/contribution'
                ? 'DGM_YOUTH_Funds_donationsContributons_request'
                : 'DGM_YOUTH_Funds_monthlyDues_request'
            }`,
            id + requestedAmount
          ),
          {
            /* firstName, lastName, avatarPath */
            requestedAmount,
            purposeForRequestedAmount,
            selectedSource,
            status: 'pending',
            requestedAt: Math.floor(Date.now() / 1000),
            requestedBy:
              getUserDetails?.firstName + ' ' + getUserDetails?.lastName,
            picture: getUserDetails?.avatarPath,
          }
        );
        if (selectedSource === 'donation/contribution') {
          await updateDoc(
            doc(
              db,
              'DGM_YOUTH_TotaldonationsContributons',
              'donationsContributons'
            ),
            {
              total: totalDonCont - requestedAmount * 1,
            }
          );
        } else {
          await updateDoc(
            doc(db, 'DGM_YOUTH_TotalTotalMonthlyDues', 'TotalMonltyDues'),
            {
              total: totalDues - requestedAmount * 1,
            }
          );
        }

        const data1 = await getDocs(allDonationAndContributions);
        setAllDonationContributions(
          data1.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))
        );
        const data2 = await getDocs(allDonationAndContributionsRequests);
        setAllDonConRequested(
          data2.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))
        );
        const data3 = await getDocs(allMonths);
        setAllMonthlyDues(
          data3.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))
        );

        const data4 = await getDocs(allMonthsRequests);
        setAllMonthlyDuesRequested(
          data4.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))
        );

        const data5 = await getDocs(totalDuesCollectiion);
        setTotalDues(
          data5.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))[0].total
        );

        const data6 = await getDocs(totalDonConCollectiion);
        setTotalDonCon(
          data6.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))[0].total
        );

        const data7 = await getDocs(totalDonConCollectiion);
        const data8 = await getDocs(totalDuesCollectiion);
        setSuccess(!success);

        let grandTotal =
          data7.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))[0]
            .total +
          data8.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))[0]
            .total;

        setCurrentBalance(grandTotal);
        setPurposeForRequestedAmount('');
        setSelectedSource('');
        setLoading(false);
        toggleRequestFundsModal();
        Alert.alert('Success', 'Funds Request Success.', [
          {
            text: 'Cancel',

            style: 'cancel',
          },
          { text: 'OK' },
        ]);
      } catch (e) {}
    }
  };

  useEffect(() => {
    const getAllDonationAndContributions = async () => {
      setLoading(true);
      const data = await getDocs(allDonationAndContributions);
      setAllDonationContributions(
        data.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))
      );
      setLoading(false);
    };
    const getAllDonationAndContributionsRequests = async () => {
      setLoading(true);
      const data = await getDocs(allDonationAndContributionsRequests);
      setAllDonConRequested(
        data.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))
      );
      setLoading(false);
    };
    const getAllMonthlyDues = async () => {
      setLoading(true);
      const data = await getDocs(allMonths);
      setAllMonthlyDues(
        data.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))
      );
      setLoading(false);
    };
    const getAllMonthlyDuesRequests = async () => {
      setLoading(true);
      const data = await getDocs(allMonthsRequests);
      setAllMonthlyDuesRequested(
        data.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))
      );
      setLoading(false);
    };

    const getTotalDuesCollectiion = async () => {
      setLoading(true);
      const data = await getDocs(totalDuesCollectiion);
      setTotalDues(
        data.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))[0].total
      );
      setLoading(false);
    };
    const getTotalDonCon = async () => {
      setLoading(true);
      const data = await getDocs(totalDonConCollectiion);
      setTotalDonCon(
        data.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))[0].total
      );
      setLoading(false);
    };
    const getTotalFunds = async () => {
      setLoading(true);
      const data1 = await getDocs(totalDonConCollectiion);
      const data2 = await getDocs(totalDuesCollectiion);

      let total =
        data1.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))[0].total +
        data2.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))[0].total;

      setCurrentBalance(total);
      setLoading(false);
    };

    getTotalDuesCollectiion();
    getTotalDonCon();
    getTotalFunds();
    getAllMonthlyDues();
    getAllDonationAndContributions();
    getAllMonthlyDuesRequests();
    getAllDonationAndContributionsRequests();
  }, [success]);
  return (
    <View style={styles.container}>
      <View style={styles.historyContainer}>
        <FinanceSummaryComponent
          title='Current Balance'
          value={`¢${currentBalance ? currentBalance?.toFixed(2) : 0}`}
          icon={<FontAwesome5 size={34} name='money-bill-alt' color='white' />}
        />
        <FinanceSummaryComponent
          title='Monthly Dues'
          value={`¢${totalDues ? totalDues?.toFixed(2) : 0}`}
          icon={<AntDesign size={34} name='calendar' color='white' />}
        />
        <FinanceSummaryComponent
          title='Donations / Contributons'
          value={`¢${totalDonCont ? totalDonCont?.toFixed(2) : 0}`}
          icon={
            <MaterialCommunityIcons
              size={34}
              name='hand-coin-outline'
              color='white'
            />
          }
        />
        <View
          style={{
            // flex: 1,
            flexDirection: 'row',
            // width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Pressable
            onPress={toggleAddFundsModal}
            style={{
              backgroundColor: 'green',
              borderRadius: 10,
              width: '44%',
              height: 40,
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 5,
              marginTop: 5,
            }}
          >
            <Ionicons size={30} name='add-circle-outline' color='white' />
          </Pressable>
          <Pressable
            onPress={toggleRequestFundsModal}
            style={{
              backgroundColor: '#ed6c02',
              borderRadius: 10,
              width: '45%',
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              padding: 5,
              marginTop: 5,
            }}
          >
            <AntDesign size={30} name='minuscircleo' color='white' />
          </Pressable>
        </View>
      </View>

      {/* ADD FUNDS MODAL */}

      <Modal backdropOpacity={0.9} isVisible={addFundsIsModalVisible}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: 'white',
              fontWeight: '600',
              fontSize: 16,
              textAlign: 'center',
            }}
          >
            ADD FUNDS
          </Text>
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white' }}>
              No. of months
            </Text>
            <TextInput
              value={amoutToAddfunds}
              onChangeText={(amount) => {
                setAmoutToAddfunds(amount);
              }}
              style={styles.loginInput}
              placeholder='Enter number of months paid'
              keyboardType='number-pad'
              placeholderTextColor={'white'}
            />
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white' }}>
              Select source to add funds
            </Text>
            <Center>
              <Box maxW='100%' mt={3}>
                <Select
                  color='white'
                  selectedValue={selectedSource}
                  minWidth='200'
                  accessibilityLabel='Choose source'
                  placeholder='Choose source'
                  _selectedItem={{
                    bg: 'teal.600',
                    endIcon: <CheckIcon size='5' />,
                  }}
                  mt={1}
                  onValueChange={(itemValue) => setSelectedSource(itemValue)}
                >
                  <Select.Item label='Monthly Dues' value='monthlyDues' />
                  <Select.Item
                    label='Donations / Contributons'
                    value='donationsContributons'
                  />
                </Select>
              </Box>
            </Center>
          </View>

          {loading ? (
            <ActivityIndicator size='large' color='green' />
          ) : (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 60,
              }}
            >
              <Pressable
                onPress={handleAddFunds}
                style={{
                  backgroundColor: 'green',
                  width: 150,
                  borderRadius: 10,
                  alignItems: 'center',
                  height: 40,
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{ fontWeight: 'bold', fontSize: 16, color: 'white' }}
                >
                  ADD FUNDS
                </Text>
              </Pressable>
              <Pressable
                onPress={toggleAddFundsModal}
                style={{
                  backgroundColor: 'red',
                  width: 150,
                  borderRadius: 10,
                  alignItems: 'center',
                  height: 40,
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{ fontWeight: 'bold', fontSize: 16, color: 'white' }}
                >
                  CLOSE
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </Modal>

      {/* REQUEST FUNDS MODAL */}

      <Modal backdropOpacity={0.9} isVisible={requestFundsIsModalVisible}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: 'white',
              fontWeight: '600',
              fontSize: 16,
              textAlign: 'center',
            }}
          >
            REQUEST FOR FUNDS
          </Text>
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white' }}>
              Amount
            </Text>
            <TextInput
              value={requestedAmount}
              onChangeText={(amount) => {
                setRequestedAmount(amount);
              }}
              style={styles.loginInput}
              placeholder='Enter amount'
              keyboardType='number-pad'
              placeholderTextColor={'white'}
            />
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white' }}>
              Purpose
            </Text>
            <TextInput
              value={purposeForRequestedAmount}
              onChangeText={(text) => {
                setPurposeForRequestedAmount(text);
              }}
              style={styles.loginInput}
              placeholder='Enter amount'
              keyboardType='default'
              placeholderTextColor={'white'}
            />
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white' }}>
              Select source to requst for funds
            </Text>
            <Center>
              <Box maxW='100%' mt={3}>
                <Select
                  color='white'
                  selectedValue={selectedSource}
                  minWidth='200'
                  accessibilityLabel='Choose source'
                  placeholder='Choose source'
                  _selectedItem={{
                    bg: 'teal.600',
                    endIcon: <CheckIcon size='5' />,
                  }}
                  mt={1}
                  onValueChange={(itemValue) => setSelectedSource(itemValue)}
                >
                  <Select.Item label='Monthly Dues' value='monthlyDues' />
                  <Select.Item
                    label='Donations / Contributons'
                    value='donationsContributons'
                  />
                </Select>
              </Box>
            </Center>
          </View>

          {loading ? (
            <ActivityIndicator size='large' color='green' />
          ) : (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 60,
              }}
            >
              <Pressable
                onPress={handleRequstFounds}
                style={{
                  backgroundColor: 'green',
                  width: 150,
                  borderRadius: 10,
                  alignItems: 'center',
                  height: 40,
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{ fontWeight: 'bold', fontSize: 16, color: 'white' }}
                >
                  REQUEST
                </Text>
              </Pressable>
              <Pressable
                onPress={toggleRequestFundsModal}
                style={{
                  backgroundColor: 'red',
                  width: 150,
                  borderRadius: 10,
                  alignItems: 'center',
                  height: 40,
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{ fontWeight: 'bold', fontSize: 16, color: 'white' }}
                >
                  CLOSE
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default PaymenetComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyContainer: {
    flex: 1,
    width: '100%',
  },
  loginInput: {
    marginBottom: 40,
    height: 40,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: 'white',
    marginVertical: 6,
    fontSize: 16,
    color: 'white',
  },
});
