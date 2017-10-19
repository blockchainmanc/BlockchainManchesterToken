const expectThrow = require('./utils').expectThrow;
const BlockchainManchesterTokenAbstraction = artifacts.require('BlockchainManchesterToken');

let BcmToken;

const ONE_MILLION = 1000000;

contract('BlockchainManchesterToken', function (accounts) {
    beforeEach(async () => {
        BcmToken = await BlockchainManchesterTokenAbstraction.new({from: accounts[0]})
    });

    it('creation: should create an initial balance of a million for the creator', async () => {
        const balance = await BcmToken.balanceOf.call(accounts[0]);
        assert.strictEqual(balance.toNumber(), ONE_MILLION);
    });

    it('creation: test correct setting of vanity information', async () => {
        const name = await BcmToken.name.call();
        assert.strictEqual(name, 'Blockchain Manchester Token');

        const decimals = await BcmToken.decimals.call();
        assert.strictEqual(decimals.toNumber(), 0);

        const symbol = await BcmToken.symbol.call();
        assert.strictEqual(symbol, 'BCM');
    });


    // TRANSERS
    // normal transfers without approvals
    it('transfers: ether transfer should be reversed.', async () => {
        const balanceBefore = await BcmToken.balanceOf.call(accounts[0]);
        assert.strictEqual(balanceBefore.toNumber(), ONE_MILLION);

        web3.eth.sendTransaction({
            from: accounts[0],
            to: BcmToken.address,
            value: web3.toWei('10', 'Ether')
        }, async (err, res) => {
            expectThrow(new Promise((resolve, reject) => {
                if (err) reject(err);
                resolve(res)
            }));

            const balanceAfter = await BcmToken.balanceOf.call(accounts[0]);
            assert.strictEqual(balanceAfter.toNumber(), ONE_MILLION);
        })
    });

    it('transfers: should transfer 10000 to accounts[1] with accounts[0] having 10000', async () => {
        await BcmToken.transfer(accounts[1], 10000, {from: accounts[0]});
        const balance = await BcmToken.balanceOf.call(accounts[1]);
        assert.strictEqual(balance.toNumber(), 10000);
    });


    it('transfers: should fail when trying to transfer 1000001 to accounts[1] with accounts[0] having 1000000', () => {
        return expectThrow(BcmToken.transfer.call(accounts[1], 1000001, {from: accounts[0]}))
    });


    it('transfers: should handle zero-transfers normally', async () => {
        assert(await BcmToken.transfer.call(accounts[1], 0, {from: accounts[0]}), 'zero-transfer has failed')
    });

    // APPROVALS
    it('approvals: msg.sender should approve 100 to accounts[1]', async () => {
        await BcmToken.approve(accounts[1], 100, {from: accounts[0]});
        const allowance = await BcmToken.allowance.call(accounts[0], accounts[1]);
        assert.strictEqual(allowance.toNumber(), 100);
    });


    it('approvals: msg.sender approves accounts[1] of 100 & withdraws 20 once.', async () => {
        const balance0 = await BcmToken.balanceOf.call(accounts[0]);
        assert.strictEqual(balance0.toNumber(), ONE_MILLION);

        await BcmToken.approve(accounts[1], 100, {from: accounts[0]}); // 100
        const balance2 = await BcmToken.balanceOf.call(accounts[2]);
        assert.strictEqual(balance2.toNumber(), 0, 'balance2 not correct');

        BcmToken.transferFrom.call(accounts[0], accounts[2], 20, {from: accounts[1]});
        await BcmToken.allowance.call(accounts[0], accounts[1]);
        await BcmToken.transferFrom(accounts[0], accounts[2], 20, {from: accounts[1]}); // -20
        const allowance01 = await BcmToken.allowance.call(accounts[0], accounts[1]);
        assert.strictEqual(allowance01.toNumber(), 80); // =80

        const balance22 = await BcmToken.balanceOf.call(accounts[2]);
        assert.strictEqual(balance22.toNumber(), 20);

        const balance02 = await BcmToken.balanceOf.call(accounts[0]);
        assert.strictEqual(balance02.toNumber(), 999980)
    });

    // should approve 100 of msg.sender & withdraw 50, twice. (should succeed)
    it('approvals: msg.sender approves accounts[1] of 100 & withdraws 20 twice.', async () => {
      await BcmToken.approve(accounts[1], 100, {from: accounts[0]});
      const allowance01 = await BcmToken.allowance.call(accounts[0], accounts[1]);
      assert.strictEqual(allowance01.toNumber(), 100);

      await BcmToken.transferFrom(accounts[0], accounts[2], 20, {from: accounts[1]});
      const allowance012 = await BcmToken.allowance.call(accounts[0], accounts[1]);
      assert.strictEqual(allowance012.toNumber(), 80);

      const balance2 = await BcmToken.balanceOf.call(accounts[2]);
      assert.strictEqual(balance2.toNumber(), 20);

      const balance0 = await BcmToken.balanceOf.call(accounts[0]);
      assert.strictEqual(balance0.toNumber(), 999980);

      // FIRST tx done.
      // onto next.
      await BcmToken.transferFrom(accounts[0], accounts[2], 20, {from: accounts[1]});
      const allowance013 = await BcmToken.allowance.call(accounts[0], accounts[1]);
      assert.strictEqual(allowance013.toNumber(), 60);

      const balance22 = await BcmToken.balanceOf.call(accounts[2]);
      assert.strictEqual(balance22.toNumber(), 40);

      const balance02 = await BcmToken.balanceOf.call(accounts[0]);
      assert.strictEqual(balance02.toNumber(), 999960)
    });

    // should approve 100 of msg.sender & withdraw 50 & 60 (should fail).
    it('approvals: msg.sender approves accounts[1] of 100 & withdraws 50 & 60 (2nd tx should fail)', async () => {
      await BcmToken.approve(accounts[1], 100, {from: accounts[0]});
      const allowance01 = await BcmToken.allowance.call(accounts[0], accounts[1]);
      assert.strictEqual(allowance01.toNumber(), 100);

      await BcmToken.transferFrom(accounts[0], accounts[2], 50, {from: accounts[1]});
      const allowance012 = await BcmToken.allowance.call(accounts[0], accounts[1]);
      assert.strictEqual(allowance012.toNumber(), 50);

      const balance2 = await BcmToken.balanceOf.call(accounts[2]);
      assert.strictEqual(balance2.toNumber(), 50);

      const balance0 = await BcmToken.balanceOf.call(accounts[0]);
      assert.strictEqual(balance0.toNumber(), 999950);

      // FIRST tx done.
      // onto next.
      await expectThrow(BcmToken.transferFrom.call(accounts[0], accounts[2], 60, {from: accounts[1]}))
    });

    it('approvals: attempt withdrawal from account with no allowance (should fail)', function () {
      return expectThrow(BcmToken.transferFrom.call(accounts[0], accounts[2], 60, {from: accounts[1]}))
    });


    it('approvals: allow accounts[1] 100 to withdraw from accounts[0]. Withdraw 60 and then approve 0 & attempt transfer.', async () => {
      BcmToken.approve(accounts[1], 100, {from: accounts[0]});
      BcmToken.transferFrom(accounts[0], accounts[2], 60, {from: accounts[1]});
      BcmToken.approve(accounts[1], 0, {from: accounts[0]});
      await expectThrow(BcmToken.transferFrom.call(accounts[0], accounts[2], 10, {from: accounts[1]}))
    });
    
    it('events: should fire Transfer event properly', async () => {
      const res = await BcmToken.transfer(accounts[1], '2666', {from: accounts[0]});
      const transferLog = res.logs.find(element => element.event.match('Transfer'));
      assert.strictEqual(transferLog.args._from, accounts[0]);
      assert.strictEqual(transferLog.args._to, accounts[1]);
      assert.strictEqual(transferLog.args._value.toString(), '2666')
    });

    it('events: should fire Transfer event normally on a zero transfer', async () => {
      const res = await BcmToken.transfer(accounts[1], '0', {from: accounts[0]});
      const transferLog = res.logs.find(element => element.event.match('Transfer'));
      assert.strictEqual(transferLog.args._from, accounts[0]);
      assert.strictEqual(transferLog.args._to, accounts[1]);
      assert.strictEqual(transferLog.args._value.toString(), '0')
    });

    it('events: should fire Approval event properly', async () => {
      const res = await BcmToken.approve(accounts[1], '2666', {from: accounts[0]});
      const approvalLog = res.logs.find(element => element.event.match('Approval'));
      assert.strictEqual(approvalLog.args._owner, accounts[0]);
      assert.strictEqual(approvalLog.args._spender, accounts[1]);
      assert.strictEqual(approvalLog.args._value.toString(), '2666')
    })
});
