# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

Feature: Ability to add Custom Id to an Agent by the Facilities based on the work.

# Story 1: 
    As a facility user I want the ability to add a custom id to the agent based on their working facility when I am entering their shift details.
    
    Acceptance Criteria:
        1. When I am entering the shift details of an agent there should be a text field to enter the custom aganet id.
        2. If the the custom agent id is already saved previously by the same facility, the field should be auto populated with the saved data.
        3. Add the required validations to this field ( current assumption is the custom agent id is AlphaNumeric with a maximum of 50 characters)
    
    Technical Approach:
        Introduce a new table named as `AgentFacility` with `AgentId, FacilityId, CustomAgentId, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate` in the database.
        When saving the shift, if the CustomAgentId is changed Insert/Update the details to AgentFacility table with one to one mapping of Agent and Facility.

    Assumption
        There will be only one custom id to an agent per fascility

    Estimate 
        The DB chnages : 2 hours
        API Changes : 3 hours
        UI Chnages: 4 hours
        QA: 2 hours

        Effort: 8 Points ( Fibanocci)

# Story 2:
    Update the `getShiftsByFacility` so that it returns the custom agent id along with the Agent metadata

    Acceptance Criteria
        1. The function /API returning all Shifts worked that quarter should be included custom agent id, I shall be able to see the custom agent id in the response.

    Technical Approach
        Use the data in `AgentFacility` table to get the custom agent id to the given Facility Id and the agenet id

    
    Effort
        Function Changes: 4 hours
        QA: 1 hours

        Effort: 3 Points

# Story 3:
    As a Facility user I shall be able to see the custom agent id in the Agent shift report.

    Acceptance Criteria
        1. When I am generating the shift reports of  my agent I shall be able to see the custom agent if of the agent specific to our facility.

    Technical Approach
         Update the UI of the report in a such way that to use the custome agent id returned from `getShiftsByFacility` as part of the metadata and display the same instead of the agent id.

    Effort
        Report UI update: 8 hours
        QA: 2 hours

        Effort: 5 Point

