import { Accordion, List } from "@mantine/core";
import React from "react";
import { NavLink } from "react-router-dom";
import { Image } from "./ImageInterface.tsx";
import QuestIcon from "./../QuestIconEdited.png";

export const QuestDetails = () => {
    return <>
        <h3>New Quest Details Section</h3>
					<Accordion
						defaultValue=""
						chevron={
							<Image src={QuestIcon} alt="Quest Icon" width="20px" height="20px" />
						}
					>
						<Accordion.Item key={1} value="Click to Show Quest Requirements">
							<Accordion.Control
								styles={{
									control: { color: hasLabelColor ? userLabelColor : "" },
								}}
							>
								Requirements
							</Accordion.Control>
							<Accordion.Panel>
								<div>
									<ul>
										{QuestDetailsData.map((quest, questIndex) => {
											return (
												<React.Fragment key={questIndex}>
													{quest.Requirements.map((requirement, requirementIndex) => {
														// Combine questIndex and requirementIndex to create a unique key
														const uniqueKey = `${questIndex}-${requirementIndex}`;
														const hasSkill = skillLevels.some((value) => {
															const splitValue = value.split(" ");
															const isNumber = !isNaN(parseFloat(splitValue[0]));
															const reqStr = requirement.split(" ");
															const isReqNum = !isNaN(parseFloat(reqStr[0]));

															if (isNumber && isReqNum) {
																const numberPart = parseInt(splitValue[0]);
																const requirementNumber = parseInt(reqStr[0]);

																// Compare the extracted number
																return numberPart > requirementNumber;
															}
															return false;
														});
														const needLeela =
															requirement ===
																"Fully restore Senliten from the 'Missing My Mummy' quest" ||
															"Bring Leela to Senliten's tomb";
														const needMort = requirement === "Ability to enter Morytania";
														const needJunglePotion =
															requirement ===
															"Jungle Potion is only required if clean volencia moss is a requested item during the quest";
														let abilityToEnterMort = false;

														//let mmm = false;
														if (needMort) {
															const hasPriestInPeril =
																completedQuests &&
																completedQuests.some((value) => {
																	if (value && typeof value === "object" && "title" in value) {
																		return (
																			(value as { title?: string }).title === "Priest in Peril"
																		);
																	}
																});
															if (hasPriestInPeril) {
																abilityToEnterMort = true;
															}
														}
														if (needLeela) {
															const hasMMM =
																completedQuests &&
																completedQuests.some((value) => {
																	if (value && typeof value === "object") {
																		return (
																			(value as { title?: string }).title === "Missing My Mummy"
																		);
																	}
																});
															if (hasMMM) {
																//mmm = true;
															}
														}
														let junglePotion = false;
														if (needJunglePotion) {
															const hasJunglePotion =
																completedQuests &&
																completedQuests.some((value) => {
																	if (value && typeof value === "object" && "title" in value) {
																		return (
																			(value as { title?: string }).title === "Jungle Potion"
																		);
																	}
																});
															if (hasJunglePotion) {
																junglePotion = true;
															}
														}

														const isComplete =
															completedQuests &&
															completedQuests.some((value) => {
																if (value && typeof value === "object" && "title" in value) {
																	return (value as { title?: string }).title === requirement;
																}
																return false;
															});

														let color = "#C64340"; // Default to red

														if (isComplete) {
															color = "#24BF58"; // Green
														}
														if (junglePotion) {
															color = "#24BF58";
														}
														if (abilityToEnterMort) {
															color = "#24BF58";
														}

														const requirementParts = requirement.split(" ");
														const firstPart: number = parseInt(requirementParts[0]);

														return (
															<li
																key={uniqueKey}
																style={{
																	display: "block",
																}}
															>
																{!isNaN(firstPart) || requirement === "None" ? (
																	<span style={{ color: hasSkill ? "#24BF58" : "#C64340" }}>
																		{requirement}
																	</span>
																) : (
																	<NavLink
																		to="/QuestPage"
																		onClick={() => {
																			history.go(0);
																		}}
																		state={{
																			questName: requirement,
																			modified: requirement.toLowerCase().replace(/[!,`']/g, ""),
																		}}
																		style={{
																			display: "block",
																			color: color,

																			textDecoration: "none",
																		}}
																	>
																		<span>{requirement}</span>
																	</NavLink>
																)}
															</li>
														);
													})}
												</React.Fragment>
											);
										})}
									</ul>
								</div>
							</Accordion.Panel>
						</Accordion.Item>
						<Accordion.Item key={2} value="Click to Show Start Point">
							<Accordion.Control
								className="AccordianControl"
								styles={{
									control: { color: hasLabelColor ? userLabelColor : "" },
								}}
							>
								Start Point
							</Accordion.Control>
							<Accordion.Panel c={hasColor ? userColor : ""}>
								<div>
									{QuestDetailsData.map((value) => {
										return value.StartPoint;
									})}
								</div>
							</Accordion.Panel>
						</Accordion.Item>
						<Accordion.Item key={3} value="Members Or Not">
							<Accordion.Control
								className="AccordianControl"
								styles={{
									control: { color: hasLabelColor ? userLabelColor : "" },
								}}
							>
								Is This a Members Quest?
							</Accordion.Control>
							<Accordion.Panel c={hasColor ? userColor : ""}>
								<div>
									{QuestDetailsData.map((value) => {
										return value.MemberRequirement;
									})}
								</div>
							</Accordion.Panel>
						</Accordion.Item>
						<Accordion.Item key={4} value="Official Length of Quest">
							<Accordion.Control
								className="AccordianControl"
								styles={{
									control: { color: hasLabelColor ? userLabelColor : "" },
								}}
							>
								How Long is This Quest?
							</Accordion.Control>
							<Accordion.Panel c={hasColor ? userColor : ""}>
								<div>
									{QuestDetailsData.map((value) => {
										return value.OfficialLength;
									})}
								</div>
							</Accordion.Panel>
						</Accordion.Item>
						<Accordion.Item key={5} value="Items Required">
							<Accordion.Control
								className="AccordianControl"
								styles={{
									control: { color: hasLabelColor ? userLabelColor : "" },
								}}
							>
								Items You Definitely Need
							</Accordion.Control>
							<Accordion.Panel c={hasColor ? userColor : ""}>
								<div>
									<List listStyleType="none">
										{QuestDetailsData.map((quest, questIndex) => {
											return (
												<React.Fragment key={questIndex}>
													{quest.ItemsRequired.map((item, itemIndex) => {
														// Combine questIndex and itemIndex to create a unique key
														const uniqueKey = `${questIndex}-${itemIndex}`;

														return (
															<List.Item key={uniqueKey}>
																{"- "}
																{item}
															</List.Item>
														);
													})}
												</React.Fragment>
											);
										})}
									</List>
								</div>
							</Accordion.Panel>
						</Accordion.Item>
						<Accordion.Item key={6} value="Recommended">
							<Accordion.Control
								className="AccordianControl"
								title="Items You Might Need"
								styles={{
									control: { color: hasLabelColor ? userLabelColor : "" },
								}}
							>
								Items You Might Need
							</Accordion.Control>
							<Accordion.Panel c={hasColor ? userColor : ""}>
								<div>
									<List listStyleType="none">
										{QuestDetailsData.map((quest, questIndex) => {
											return (
												<React.Fragment key={questIndex}>
													{quest.Recommended.map((item, itemIndex) => {
														// Combine questIndex and itemIndex to create a unique key
														const uniqueKey = `${questIndex}-${itemIndex}`;

														return (
															<List.Item key={uniqueKey}>
																{"- "}
																{item}
															</List.Item>
														);
													})}
												</React.Fragment>
											);
										})}
									</List>
								</div>
							</Accordion.Panel>
						</Accordion.Item>
						<Accordion.Item key={7} value="Enemies to Defeat">
							<Accordion.Control
								className="AccordianControl"
								styles={{
									control: { color: hasLabelColor ? userLabelColor : "" },
								}}
							>
								Enemies To Look Out For
							</Accordion.Control>
							<Accordion.Panel c={hasColor ? userColor : ""}>
								<div>
									<List listStyleType="none">
										{QuestDetailsData.map((quest, questIndex) => (
											<React.Fragment key={questIndex}>
												{quest.EnemiesToDefeat.map((value, enemiesIndex) => {
													const UniqueID = `${questIndex}-${enemiesIndex}`;
													return (
														<List.Item key={UniqueID}>
															{"- "}
															{value}
														</List.Item>
													);
												})}
											</React.Fragment>
										))}
									</List>
								</div>
							</Accordion.Panel>
						</Accordion.Item>
					</Accordion>
    </>;
};
