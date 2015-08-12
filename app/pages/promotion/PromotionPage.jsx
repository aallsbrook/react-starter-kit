'use strict';

import './_PromotionPage.scss';

import React from 'react';

import ErrorStore from '../../stores/ErrorStore';
import PromotionsActions from '../../actions/PromotionsActions';
import PromotionsStore from '../../stores/PromotionsStore';

import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import TextInput from '../../components/TextInput/TextInput';

import { PROMO_ACCEPT_TERMS, PROMO_DECLINE_TERMS, PROMOTIONS_POST_ERROR } from '../../constants/AppConstants';
import { ButtonConstants, ModalConstants } from '../../components/ComponentConstants';

import _ from 'lodash';

class PromotionPage extends React.Component {

  constructor (...args) {
    super(...args);

    let promoID = PromotionsStore.getAvailablePromo();

    if (!promoID) {
      window.history.back();
    }

    this.handlePromoChange = this.handlePromoChange.bind(this);
    this.handleError = this.handleError.bind(this);
    this.props.setTitle('CarZen');

    this.state = {
      cardObject: {
        id: 'promo',
        title: 'Win a 2016 Subaru Legacy',
        text: 'Thank you for downloading CarZen. Enter your email for a chance to win a Subaru Legacy.',
        button: {
          type: ButtonConstants.Type.LARGE_SECONDARY,
          text: 'Enter Sweepstakes',
          handleClick: this.handleSubmit.bind(this)
        }
      },
      page: 'promo',
      promoID: promoID,
      promoObj: PromotionsStore.getPromo(promoID)
    };
  }

;

  componentDidMount () {
    document.getElementById('BodyElement').classList.add('PromotionPage');
    if (this.state.promoID) {
      React.findDOMNode(this).classList.remove('hidden');
    }
    ErrorStore.addChangeListener(this.handleError);
    PromotionsStore.addChangeListener(this.handlePromoChange);
  }

  componentWillUnmount () {
    document.getElementById('BodyElement').classList.remove('PromotionPage');

    ErrorStore.removeChangeListener(this.handleError);
    PromotionsStore.removeChangeListener(this.handlePromoChange);
  }

  render () {

    var content, footer;
    if (this.state.cardObject.id === 'promo') {
      content = (
        <div>
          <div className='Card-image'></div>
          <div className='Card-text'>
            {this.state.cardObject.text}
          </div>
          <div className='Card-content'>
            <TextInput ref='emailInput' id="email" type='email' placeholder='Enter Email' cssErrorClass='error'
                       cssErrorArrowClass='arrow-up'/>

            <div className='Card-subtext'>
              Click here for <span className='pseudolink' onClick={this.showTerms.bind(this)}>Official Rules</span>
            </div>
          </div>
          <div className='Card-button'>
            <Button buttonType={this.state.cardObject.button.type}
                    buttonText={this.state.cardObject.button.text}
                    buttonIcon={this.state.cardObject.button.icon}
                    onClick={this.state.cardObject.button.handleClick}/>
          </div>
        </div>
      );
      footer = (
        <div className='Card-footer'>
          <span className='pseudolink' onClick={this.handleNoThanks.bind(this)}>No Thanks</span>
        </div>
      );
    } else if (this.state.cardObject.id === 'terms') {
      content = (
        <div>
          <p className="firstBlock">NO PURCHASE OR TRANSACTION NECESSARY TO ENTER OR WIN. A PURCHASE OR TRANSACTION DOES
            NOT INCREASE YOUR CHANCES OF WINNING. VOID IN HAWAII AND WHERE PROHIBITED. ODDS OF WINNING DEPEND ON THE
            NUMBER OF ENTRIES RECEIVED. U.S. LAW GOVERNS THIS SWEEPSTAKES.</p>

          <div className="tac">
            <h3>Sweepstakes Period</h3>

            <p>The Liberty Mutual Insurance 2015 CarZen Summer Sweepstakes (“Sweepstakes”) is sponsored by Liberty
              Mutual Insurance Company (“Sponsor”) and starts 12:01 a.m. Eastern Standard Time (“EDT”) July 15, 2015 and
              ends 11:59 p.m. EDT on August 31, 2015 (“Sweepstakes Period”). Cohen-Friedberg Associates, LLC (“CFA”) has
              been retained by the Sponsor to administer the Sweepstakes.</p>

            <h3>Eligibility</h3>

            <p>The Sweepstakes is only open to current members of select Liberty Mutual personal insurance affinity
              organizations (each an “Eligible Affinity Organization”) residing legally in the continental United States
              and the District of Columbia (excluding Hawaii), age 18 or older (or the age of majority in entrant's
              state of residence) (together "Entrants"). Employees of Sponsor, Sponsor’s parent companies, subsidiaries,
              affiliates, distributors and advertising, promotion and Internet agencies, and members of the immediate
              family or household of any such employee, are not eligible. Employees of CFA and of Eligible Affinity
              Organizations, their affiliated and subsidiary companies, and professional advisors and their immediate
              families (spouse and parent, child and sibling and their respective spouses, regardless of where they
              reside) and household members, whether or not related, are not eligible.</p>

            <h3>How To Enter</h3>

            <p>There are three ways to enter: 1. During the Sweepstakes Period, each Eligible Affinity Organization will
              send an email to all of its current members (Entrants) inviting them to enter the Sweepstakes by
              downloading the CarZen application (“CarZen Application”). The email invitation will contain a link that
              directs the reader to the to an app store (i.e. to iTunes on an apple device and to the Android Market for
              Android devices) to download the CarZen Application and to create their profile by entering their email
              address and ZIP code. Once the CarZen Application is downloaded and the profile is completed, the Entrant
              will receive a transaction confirmation by email. The transaction confirmation email established the
              entry. Normal time rates, if any, charged by the Entrant’s Internet service provider may apply. The
              transaction confirmation email must be received by entrant by 11:59 p.m. EDT on August 31, 2015. 2. As an
              alternative to entering via the link in the email invitation received from their Eligible Affinity
              Organization, Entrants may instead enter by following instructions located in online announcements made by
              Eligible Affinity Organizations (if any) to download the CarZen Application and create their profile. 3.
              Entrants may also enter by legibly printing the Entrant’s name, street address, city, zip code, age,
              telephone number and complete email address, on a 3 x 5 inch (or 7.5 x 12.5 cm) piece of paper and
              inserting in a #10 Business envelope and mailing it to 2015 CarZen Summer Sweepstakes, P.O. Box 2312
              Framingham, Massachusetts, 01703-2312. Mail-in entries must be post-marked by August 31, 2015 and received
              by September 7, 2015. All entries become the exclusive property of Sponsor and will not be acknowledged or
              returned. There is a limit of one (1) entry per person and per e-mail address during the Sweepstakes
              Period. To ensure that only current members of Eligible Affinity Organizations enter this Sweepstakes, all
              Entrants must receive the initial email invitation from their Eligible Affinity Organization to be
              eligible to enter, regardless of the method of entry chosen. Odds of winning depend on the number of
              eligible entries received.</p>

            <h3>Prizes</h3>

            <p>One (1) Prize will be offered (&ldquo;Prize&rdquo;). The Prize is the basic
              model of a 2016 Subaru Legacy 2.5i model that will be designated by the Subaru retailer. Color and
              additional accessories to be determined by Winner at its sole cost. The approximate retail value of the
              Prize is $21,328.00 (If the winner resides in NJ, NY, ME, VT, NH, MA, RI or CT, the approximate retail
              value of the Prize is $21,628.00.) Winner agrees that Sponsor will provide winner&rsquo;s name, address,
              phone number, email address and choice of delivering retailer to Subaru of America Inc. (&ldquo;SOA&rdquo;
              ) to enable SOA to arrange the transaction with a local Subaru retailer. Winner will pick up the prize at
              the authorized Subaru retailer. The retailer will title &amp; deliver the vehicle to winner in accordance
              with standard business practices at the dealership (winner is responsible for insurance as well as all
              applicable state and local tax, title and registration fees as well as customary retailer documentation
              fees). Winner must have a valid driver&rsquo;s license and auto insurance at the time of prize pick up.
            </p>

            <h3>Winner Selection</h3>

            <p>One (1) potential Prize winner will be selected in a random drawing conducted by Sponsor or its agent
              from all entries received during the Sweepstakes Period. The Prize drawing will occur on or about
              September 8, 2015.</p>

            <h3>Winner Notification</h3>

            <p>The potential winner will be notified by mail, telephone and/or e-mail, at Sponsor's discretion. If the
              potential winner cannot be reached within forty-eight (48) hours of the initial notification attempt, he
              or she may be disqualified and the prize awarded to an alternate winner. The winner is subject to
              verification. The potential winner may, in Sponsor’s discretion, be required to complete and return to
              Sponsor an Affidavit of Eligibility/Release of Liability, and, if legally permissible, a Publicity
              Release, within three (3) days of attempted delivery of same. If a potential winner fails to respond to
              any notification attempt within the time period specified by Sponsor, or if any attempted notification or
              prize delivery is returned as undeliverable, or if a potential winner fails to complete and return any
              required affidavit or release within the specified time period, the potential winner will be disqualified
              and an alternate winner selected.</p>

            <p>All federal, state, local taxes on the value of the Prize, if applicable, are the responsibility of the
              winner. An IRS form 1099 will be issued in the winner’s name if required by law. The Prize will be awarded
              if properly claimed. No substitution, cash redemption or transfer of the right to receive the Prize is
              permitted, except in the discretion of Sponsor, which reserves the right to substitute a Prize or Prize
              component of equal or greater value. The Prize consists only of the items expressly specified in these
              Official Rules. All expenses or costs associated with the acceptance or use of the Prize or any component
              thereof that are not expressly specified in these Official Rules as being part of the Prize.</p>

            <h3>Grant Of Rights</h3>

            <p>Entry constitutes permission for Sponsor and its parent companies, affiliates, subsidiaries, agents and
              licensees to use the Entrant’s name, likeness, voice and/or biographical information, in perpetuity,
              throughout the world, in all media and formats whether now or later known or developed, for commercial
              purposes (including, without limitation, advertising and promotion), without further compensation, unless
              prohibited by law.</p>

            <h3>Release and Limitation of Liability</h3>

            <p>Liberty Mutual, CFA, Eligible Affinity Organizations SOA and its retailers, and their respective parents,
              affiliates, subsidiaries, agents and licensees, and the officers, directors and employees of each of the
              foregoing (collectively, the “Released Parties”) are not responsible, and will have no liability for, (a)
              late, lost, delayed, illegible, damaged, corrupted or incomplete entries, incorrect or inaccurate capture
              of, damage to, or loss of entries or entry information, or any other human or technical errors of any kind
              relating to the operation of the iTunes Store, Android Market, and/or the CarZen Application,
              communications or attempted communications with any Entrant, the submission, collection, storage or
              processing of entries or the administration of the Sweepstakes, (b) any Acts of God, acts of terrorism,
              civil disturbances, work stoppage, natural disaster or any other event outside their control that may
              cause any postponement or cancellation of any trip, game, event or any component of any prize, (c)
              undeliverable e-mails resulting from any form of active or passive e-mail filtering by a user's Internet
              service provider and/or e-mail client or for insufficient space in user's e-mail account to receive
              e-mail, or (d) any damage to any computer system resulting from participation in or accessing or
              downloading information in connection with this Sweepstakes. By entering, each Entrant releases and agrees
              to hold harmless each of the Released Parties from and against any and all claims and liability arising
              out of participation in the Sweepstakes, iTunes Store, Android Market, and/or the CarZen Application, the
              acceptance, receipt or use of the Prize or Prize component and/or any use of the winner’s name, likeness,
              voice and/or biographical information as permitted hereunder, including without limitation all claims and
              liabilities based on any personal injury, property damages or loss or death. Entrants assume all liability
              for any injury or damage caused, or claimed to be caused, by participation in this Sweepstakes, iTunes
              Store, Android Market, and/or the CarZen Application, or the acceptance, receipt or use of the Prize or
              Prize component. The Released Parties are not responsible for any typographical or other error in the
              printing of the offer, administration of the Sweepstakes or in the announcement of the prize. In no event
              will more than the stated number of Prizes be awarded.</p>

            <h3>General Rules</h3>

            <p>All entries become the property of Sponsor and will not be verified or returned. By participating in this
              Sweepstakes, Entrants agree to be bound by the Official Rules and the decisions of Sponsor, which are
              final and binding in all respects. <strong>CAUTION: ANY ATTEMPT TO DELIBERATELY DAMAGE ANY WEB SITE
                ASSOCIATED WITH THIS SWEEPSTAKES OR UNDERMINE THE CONTENT OR LEGITIMATE OPERATION OF THIS SWEEPSTAKES IS
                A VIOLATION OF CRIMINAL AND CIVIL LAW. SHOULD SUCH AN ATTEMPT BE MADE, SPONSOR RESERVES THE RIGHT TO
                SEEK DAMAGES (INCLUDING ATTORNEYS’ FEES) AND OTHER REMEDIES FROM ANY PERSON OR PERSONS RESPONSIBLE FOR
                THE ATTEMPT TO THE FULLEST EXTENT PERMITTED BY LAW.</strong> Sponsor reserves the right, in its sole
              discretion, to disqualify or prohibit from participating in the Sweepstakes any individual who, in
              Sponsor’s sole discretion, Sponsor determines or believes (i) has tampered with the entry process, or has
              undermined the legitimate operation of the Website or the Sweepstakes by cheating, hacking, deception or
              other unfair playing practices, or (ii) has engaged in conduct that annoys, abuses, threatens or harasses
              any other Entrants or any representative of Sponsor, or (iii) has attempted or intends to attempt any of
              the foregoing. The use of automated devices, programs or methods to submit entries is prohibited and
              Sponsor reserves the right, in its sole discretion, to disqualify any entry that it believes may have been
              submitted using such an automated device, program or method. Sponsor reserves the right, in its sole
              discretion, to cancel, modify or suspend this Sweepstakes should a virus, bugs, Entrant fraud or
              misconduct, or other causes beyond the control of the Sponsor corrupt the administration, integrity,
              security or proper operation of the Sweepstakes. In the event of termination of the Sweepstakes, a notice
              will be posted online and a random drawing to award the prizes will be conducted from among all eligible
              entries received prior to the time of termination. Entry times will be determined using Sponsor’s
              computer, which will be the official clock for the Sweepstakes. All federal, state and local laws and
              regulations apply. By entering the Sweepstakes, each Entrant agrees that (a) any and all disputes, claims,
              and causes of action arising out of or connected with the Sweepstakes, or any prizes awarded, shall be
              resolved individually, without resort to any form of class action; and (b) any and all claims, judgments
              and awards shall be limited to actual out-of-pocket costs incurred, including costs associated with
              entering the Sweepstakes, but in no event attorneys' fees; and (c) under no circumstances will any Entrant
              be permitted to obtain any award for, and by entering each Entrant waives all rights to claim punitive,
              special, incidental or consequential damages and any and all rights to have damages multiplied or
              otherwise increased and any other damages, other than for actual out-of-pocket expenses. All issues and
              questions concerning the construction, validity, interpretation and enforceability of these Official
              Rules, or the rights and obligations of Sponsor in connection with the Sweepstakes, shall be governed by,
              and construed in accordance with the laws of the Commonwealth of Massachusetts without giving effect to
              any choice of law or conflict of law rules or provisions that would cause the application of the laws of
              any jurisdiction other than the Commonwealth of Massachusetts.</p>

            <h3>Winners Name and Rules Requests</h3>

            <p>For the names of the winner, available after September 21, 2015, or a copy of these Official Rules, send
              a written request with self-addressed, stamped envelope to: The 2015 CarZen Summer Sweepstakes, P.O. Box
              2312 Framingham, Massachusetts, 01703-2312, by September 30, 2015. VT residents may omit return
              postage.</p>

            <strong>Sponsor</strong>

            <p>Liberty Mutual Insurance Company, 175 Berkeley Street, Boston, MA 02116.</p>

            <p>The use of the name of any prize manufacturer, name or trademark in connection with any of the prizes is
              solely for the purpose of describing such prize, and is not intended to suggest any affiliation or
              sponsorship.</p>
          </div>

          <div className='done-wrapper'>
            <div className='Card-button'>
              <Button buttonType={this.state.cardObject.button.type}
                      buttonText={this.state.cardObject.button.text}
                      buttonIcon={this.state.cardObject.button.icon}
                      onClick={this.state.cardObject.button.handleClick}/>
            </div>
          </div>
        </div>
      );
    } else if (this.state.cardObject.id === 'complete') {
      content = (
        <div>
          <div className='Card-image'></div>
          <div className='Card-text'>
            {this.state.cardObject.text}
          </div>
          <div className='Card-button'>
            <Button buttonType={this.state.cardObject.button.type}
                    buttonText={this.state.cardObject.button.text}
                    onClick={this.state.cardObject.button.handleClick}/>
          </div>
        </div>
      );
    }

    return (
      <div className='page PromotionPage hidden'>
        <Card title={this.state.cardObject.title}>
          {content}
          {footer}
        </Card>
      </div>
    );
  }

  handleComplete () {
    window.location.hash = '/recommended';
  }

  handleNoThanks () {
    //let promoObj = PromotionsStore.getPromo(this.state.promoID);
    PromotionsActions.completePromotion(this.state.promoID, this.state.promoObj.appsflyer_uid, PROMO_DECLINE_TERMS);
  }

  handleSubmit () {
    //validate input
    let validEmail = /[^\s@]+@[^\s@]+\.[^\s@]+/.test(this.refs.emailInput.state.value);

    if (this.refs.emailInput.state.value.length === 0) {
      this.refs.emailInput.showError('Please enter an email.');
    } else if (!validEmail) {
      this.refs.emailInput.showError('Not a valid email.');
    } else {
      let newCardObject = _.extend({}, this.state.cardObject);
      newCardObject.button.text = 'Processing Entry';
      newCardObject.button.icon = ButtonConstants.Icon.SPINNER;
      this.setState({cardObject: newCardObject});

      document.querySelector('.PromotionPage').classList.add('processing');

      PromotionsActions.completePromotion(this.state.promoID, this.state.promoObj.appsflyer_uid, PROMO_ACCEPT_TERMS, this.refs.emailInput.state.value);
    }
  }

  handleError () {
    let errorObj = ErrorStore.getError(PROMOTIONS_POST_ERROR);
    if (errorObj.code && errorObj.code === -1) {
      //internet is down, show correct error page
      this.props.showModal(ModalConstants.Type.ERROR, {
        data: errorObj
      });
    } else if (errorObj.code && errorObj.code !== 200) {
      //an error occured, but is not one of the expected errors for this page (email taken/missing, etc)
      //so lets show general error message
      this.props.showModal(ModalConstants.Type.ERROR, {
        data: errorObj
      });
    } else {
      if (errorObj.displayMessage && errorObj.displayMessage.length > 0) {
        this.refs.emailInput.showError(errorObj.displayMessage[0]);
      }
    }

    //clear out loading state
    let newCardObject = _.extend({}, this.state.cardObject);
    newCardObject.button.text = 'Enter Sweepstakes';
    delete newCardObject.button.icon;
    this.setState({
      cardObject: newCardObject
    });
    document.querySelector('.PromotionPage').classList.remove('processing');
  }

  handlePromoChange () {
    let promoObj = PromotionsStore.getPromo(this.state.promoID);
    if (promoObj.completed && promoObj.accept === PROMO_ACCEPT_TERMS) {
      this.setState({
        cardObject: {
          id: 'complete',
          title: 'Entry complete!',
          text: 'Thank you for entering our CarZen Sweepstakes',
          button: {
            type: ButtonConstants.Type.LARGE_SECONDARY,
            text: 'OK',
            handleClick: this.handleComplete.bind(this)
          }
        },
        promoObj: promoObj
      });
    } else if (promoObj.completed && promoObj.accept === PROMO_DECLINE_TERMS) {
      this.handleComplete();
    }

    // TODO: Tech-debt - this should be common functionality, probably living in the card component.
    // Make sure we scroll to the top after transitioning to a new card.
    window.scrollTo(0, 0);

  }

  closeTerms () {
    this.setState({
      cardObject: {
        id: 'promo',
        title: 'Enter to Win a 2015 Subaru Legacy',
        text: 'Thank you for downloading CarZen. Enter your email to qualify for our Subaru Legacy giveaway.',
        button: {
          type: ButtonConstants.Type.LARGE_SECONDARY,
          text: 'Enter Sweepstakes',
          handleClick: this.handleSubmit.bind(this)
        }
      },
      page: 'promo'
    });
  }

  showTerms () {
    this.setState({
      cardObject: {
        id: 'terms',
        title: 'Liberty Mutual Insurance 2015 CarZen Summer Sweepstakes Official Rules',
        button: {
          type: ButtonConstants.Type.LARGE_DONE,
          text: 'Done',
          handleClick: this.closeTerms.bind(this)
        }
      }
    });
  }

}

PromotionPage.propTypes = {
  setTitle: React.PropTypes.func.isRequired,
  showModal: React.PropTypes.func.isRequired
};

export default PromotionPage;
