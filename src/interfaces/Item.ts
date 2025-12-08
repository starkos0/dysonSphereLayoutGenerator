
export interface Item {
  Type: string
  StackSize: number
  IconPath: string
  HpMax: number
  GridIndex?: number
  UnlockKey?: number
  Productive?: boolean
  DescFields: number[]
  isRaw?: boolean
  makes?: Make[]
  prefabDesc: PrefabDesc
  ID: number
  miningFrom?: string
  description?: string
  iconSprite: string
  typeString: string
  fuelTypeString: string
  name: string
  index?: number
  maincraft?: Maincraft
  maincraftProductCount?: number
  recipes?: Recipe[]
  rawMats?: RawMat[]
  preTech?: PreTech
  HeatValue?: number
  FuelType?: number
  ReactorInc?: number
  MechaMaterialID?: number
  EnemyDropRange?: EnemyDropRange
  EnemyDropCount?: number
  EnemyDropMask?: number
  EnemyDropLevel?: number
  handcraft?: Handcraft
  handcraftProductCount?: number
  handcrafts?: Handcraft2[]
  missingTech?: boolean
  EnemyDropMaskRatio?: number
  IsFluid?: boolean
  ModelIndex?: number
  BombType?: string
  isBomb?: boolean
  PreTechOverride?: number
  produceFrom?: string
  Potential?: number
  Ability?: number
  IsEntity?: boolean
  ModelCount?: number
  CanBuild?: boolean
  BuildIndex?: number
  BuildMode?: number
  AmmoType?: string
  isAmmo?: boolean
  CraftType?: number
  isCraft?: boolean
  isDynamicCraft?: boolean
  isFighter?: boolean
  isGroundFighter?: boolean
  isSpaceCraft?: boolean
  isSpaceFighter?: boolean
  isSmallSpaceFighter?: boolean
  isLargeCraft?: boolean
  isLargeSpaceFighter?: boolean
  SubID?: number
  Grade?: number
  Upgrades?: number[]
  canUpgrade?: boolean
  DropRate?: number
  BuildInGas?: boolean
  propertyIconSprite?: string
  propertyIconSpriteSmall?: string
  propertyName?: string
}

export interface Make {
  ID: number
  name: string
}

export interface PrefabDesc {
  startInstCapacity: number
  batchCapacity: number
  anim_working_length?: number
  selectSize: SelectSize
  selectDistance?: number
  modelIndex?: number
  hasObject?: boolean
  roughRadius?: number
  roughHeight?: number
  roughWidth?: number
  barWidth?: number
  barHeight?: number
  isAmmo?: boolean
  AmmoBlastRadius0?: number
  AmmoBlastRadius1?: number
  AmmoBlastFalloff?: number
  AmmoHitIndex?: number
  AmmoParameter0?: number
  lodCount?: number
  lodDistances?: number[]
  cullingHeight?: number
  castShadow?: number
  recvShadow?: number
  AmmoMoveAcc?: number
  AmmoTurnAcc?: number
  isCraftUnit?: boolean
  craftUnitInitializeSpeed?: number
  craftUnitMaxMovementSpeed?: number
  craftUnitMaxMovementAcceleration?: number
  craftUnitAttackRange0?: number
  craftUnitSensorRange?: number
  craftUnitROF0?: number
  craftUnitRoundInterval0?: number
  craftUnitMuzzleCount0?: number
  craftUnitAttackDamage0?: number
  craftUnitEnergyPerTick?: number
  craftUnitFireEnergy0?: number
  craftUnitRepairEnergyPerHP?: number
  craftUnitRepairHPPerTick?: number
  craftUnitAddEnemyExppBase?: number
  craftUnitAddEnemyThreatBase?: number
  craftUnitAddEnemyHatredBase?: number
  craftUnitAddEnemyExppCoef?: number
  craftUnitAddEnemyThreatCoef?: number
  craftUnitAddEnemyHatredCoef?: number
  craftUnitMuzzleInterval0?: number
  disableStarmapCulling?: boolean
  portPoses?: PortPose[]
  craftUnitMaxRotateAcceleration?: number
  craftUnitSize?: string
  craftUnitAttackRange1?: number
  craftUnitROF1?: number
  craftUnitRoundInterval1?: number
  craftUnitMuzzleCount1?: number
  craftUnitAttackDamage1?: number
  craftUnitFireEnergy1?: number
  subId?: number
  colliders?: Collider[]
  hasBuildCollider?: boolean
  buildCollider?: BuildCollider
  buildColliders?: BuildCollider2[]
  colliderComplexity?: number
  isBelt?: boolean
  beltSpeed?: number
  beltPrototype?: number
  selectCenter?: SelectCenter
  selectAlpha?: number
  signHeight?: number
  signSize?: number
  dragBuildDist?: DragBuildDist
  blueprintBoxSize?: BlueprintBoxSize
  isInserter?: boolean
  inserterGrade?: number
  inserterSTT?: number
  inserterStackSize?: number
  isPowerConsumer?: boolean
  workEnergyPerTick?: number
  idleEnergyPerTick?: number
  inserterCanStack?: boolean
  landPoints?: LandPoint[]
  multiLevel?: boolean
  lapJoint?: LapJoint
  multiLevelAllowPortsOrSlots?: boolean
  multiLevelAllowRotate?: boolean
  isSplitter?: boolean
  minimapType?: number
  dragBuild?: boolean
  isPiler?: boolean
  addonType?: string
  isMonitor?: boolean
  isSpeaker?: boolean
  addonAreaPoses?: AddonAreaPose[]
  addonAreaColPoses?: AddonAreaColPose[]
  addonAreaSize?: AddonAreaSize[]
  hasAudio?: boolean
  audioLogic?: number
  audioRadius0?: number
  audioRadius1?: number
  audioFalloff?: number
  audioVolume?: number
  audioPitch?: number
  monitorPeriodTickCount?: number
  monitorPassOperator?: number
  monitorPassColorId?: number
  monitorFailColorId?: number
  monitorSignalId?: number
  speakerTone?: number
  speakerVolume?: number
  speakerPitch?: number
  speakerLength?: number
  speakerRepeat?: boolean
  isSpraycoster?: boolean
  incCapacity?: number
  incItemId?: number[]
  isDispenser?: boolean
  dispenserMaxCourierCount?: number
  dispenserMaxEnergyAcc?: number
  multiLevelAlternativeIds?: number[]
  multiLevelAlternativeYawTransposes?: boolean[]
  isStorage?: boolean
  storageCol?: number
  storageRow?: number
  slotPoses?: SlotPose[]
  isTank?: boolean
  fluidStorageCount?: number
  audioProtoId0?: number
  audioDoppler?: number
  isAssembler?: boolean
  assemblerSpeed?: number
  assemblerRecipeType?: string
  isPowerNode?: boolean
  powerConnectDistance?: number
  powerCoverRadius?: number
  powerPoint?: PowerPoint
  isPowerCharger?: boolean
  landOffset?: number
  allowBuildInWater?: boolean
  needBuildInWaterTech?: boolean
  waterTypes?: number[]
  isPowerGen?: boolean
  windForcedPower?: boolean
  genEnergyPerTick?: number
  anim_prepare_length?: number
  useFuelPerTick?: number
  fuelMask?: number
  waterPoints?: WaterPoint[]
  geothermal?: boolean
  veinMiner?: boolean
  minerType?: string
  minerPeriod?: number
  isStation?: boolean
  stationMaxItemCount?: number
  stationMaxItemKinds?: number
  stationDronePos?: StationDronePos
  isVeinCollector?: boolean
  oilMiner?: boolean
  isFractionator?: boolean
  fracFluidInputMax?: number
  fracProductOutputMax?: number
  fracFluidOutputMax?: number
  photovoltaic?: boolean
  isAccumulator?: boolean
  inputEnergyPerTick?: number
  outputEnergyPerTick?: number
  maxAcuEnergy?: number
  isEjector?: boolean
  ejectorPivotY?: number
  ejectorMuzzleY?: number
  ejectorChargeFrame?: number
  ejectorColdFrame?: number
  ejectorBulletId?: number
  gammaRayReceiver?: boolean
  powerCatalystId?: number
  powerProductId?: number
  powerProductHeat?: number
  audioProtoId1?: number
  isSilo?: boolean
  siloChargeFrame?: number
  siloColdFrame?: number
  siloBulletId?: number
  isPowerExchanger?: boolean
  exchangeEnergyPerTick?: number
  emptyId?: number
  fullId?: number
  maxExcEnergy?: number
  stationMaxDroneCount?: number
  stationMaxEnergyAcc?: number
  stationShipPos?: StationShipPos
  isStellarStation?: boolean
  stationMaxShipCount?: number
  isCollectStation?: boolean
  stationCollectSpeed?: number
  isLab?: boolean
  labAssembleSpeed?: number
  labResearchSpeed?: number
  isTurret?: boolean
  turretType?: string
  turretAmmoType?: string
  turretVSCaps?: string
  turretDefaultDir?: TurretDefaultDir
  turretROF?: number
  turretRoundInterval?: number
  turretMuzzleInterval?: number
  turretMuzzleCount?: number
  turretMaxAttackRange?: number
  turretPitchUpMax?: number
  turretPitchDownMax?: number
  turretDamageScale?: number
  turretMuzzleY?: number
  turretAimSpeed?: number
  turretAddEnemyExppBase?: number
  turretAddEnemyThreatBase?: number
  turretAddEnemyHatredBase?: number
  turretAddEnemyExppCoef?: number
  turretAddEnemyThreatCoef?: number
  turretAddEnemyHatredCoef?: number
  audioProtoId2?: number
  turretMinAttackRange?: number
  turretSpaceAttackRange?: number
  turretUniformAngleSpeed?: number
  turretAngleAcc?: number
  isBeacon?: boolean
  beaconSignalRadius?: number
  beaconROF?: number
  beaconSpaceSignalRange?: number
  beaconPitchUpMax?: number
  beaconPitchDownMax?: number
  isFieldGenerator?: boolean
  fieldGenEnergyCapacity?: number
  fieldGenEnergyRequire0?: number
  fieldGenEnergyRequire1?: number
  isBattleBase?: boolean
  battleBaseMaxEnergyAcc?: number
  battleBasePickRange?: number
  isConstructionModule?: boolean
  constructionDroneCount?: number
  constructionRange?: number
  constructionDroneEjectPos?: ConstructionDroneEjectPos
  isCombatModule?: boolean
  combatModuleFleetProtoId?: number
  combatModuleFleetTrans?: CombatModuleFleetTran[]
}

export interface SelectSize {
  x: number
  y: number
  z: number
}

export interface PortPose {
  position: Position
  rotation: Rotation
  forward: Forward
  right: Right
  up: Up
}

export interface Position {
  y?: number
  z?: number
  x?: number
}

export interface Rotation {
  x?: number
  w?: number
  y?: number
}

export interface Forward {
  y?: number
  z: number
  x?: number
}

export interface Right {
  x: number
  z?: number
}

export interface Up {
  y: number
  z?: number
}

export interface Collider {
  idType: number
  pos?: Pos
  ext?: Ext
  q: Q
  shape: string
  usage?: string
  isForBuild?: boolean
  notForBuild?: boolean
  radius?: number
}

export interface Pos {
  y: number
  z?: number
  x?: number
}

export interface Ext {
  x?: number
  y?: number
  z?: number
}

export interface Q {
  w: number
  x?: number
}

export interface BuildCollider {
  idType: number
  pos?: Pos2
  ext: Ext2
  q: Q2
  shape: string
  usage: string
  isForBuild: boolean
}

export interface Pos2 {
  y: number
  z?: number
  x?: number
}

export interface Ext2 {
  x: number
  y: number
  z: number
}

export interface Q2 {
  w: number
  x?: number
}

export interface BuildCollider2 {
  idType: number
  pos?: Pos3
  ext: Ext3
  q: Q3
  shape: string
  usage: string
  isForBuild: boolean
}

export interface Pos3 {
  y: number
  z?: number
  x?: number
}

export interface Ext3 {
  x: number
  y: number
  z: number
}

export interface Q3 {
  w: number
  x?: number
}

export interface SelectCenter {
  y: number
  z?: number
  x?: number
}

export interface DragBuildDist {
  x: number
  y: number
}

export interface BlueprintBoxSize {
  x: number
  y: number
}

export interface LandPoint {
  y?: number
  x?: number
  z?: number
}

export interface LapJoint {
  y: number
}

export interface AddonAreaPose {
  rotation: Rotation2
  forward: Forward2
  right: Right2
  up: Up2
  position?: Position2
}

export interface Rotation2 {
  y?: number
  w: number
}

export interface Forward2 {
  x?: number
  z: number
}

export interface Right2 {
  x: number
  z?: number
}

export interface Up2 {
  y: number
}

export interface Position2 {
  y: number
  z: number
}

export interface AddonAreaColPose {
  position?: Position3
  rotation: Rotation3
  forward: Forward3
  right: Right3
  up: Up3
}

export interface Position3 {
  y?: number
  z?: number
}

export interface Rotation3 {
  y?: number
  w: number
}

export interface Forward3 {
  x?: number
  z: number
}

export interface Right3 {
  x: number
  z?: number
}

export interface Up3 {
  y: number
}

export interface AddonAreaSize {
  x: number
  y: number
  z: number
}

export interface SlotPose {
  position: Position4
  rotation: Rotation4
  forward: Forward4
  right: Right4
  up: Up4
}

export interface Position4 {
  x?: number
  y?: number
  z?: number
}

export interface Rotation4 {
  x?: number
  y?: number
  z?: number
  w?: number
}

export interface Forward4 {
  x?: number
  y?: number
  z: number
}

export interface Right4 {
  x: number
  z?: number
  y?: number
}

export interface Up4 {
  x?: number
  y: number
  z?: number
}

export interface PowerPoint {
  y: number
}

export interface WaterPoint {
  x?: number
  y: number
  z: number
}

export interface StationDronePos {
  y: number
  z?: number
}

export interface StationShipPos {
  y: number
}

export interface TurretDefaultDir {
  z: number
  y?: number
}

export interface ConstructionDroneEjectPos {
  y: number
}

export interface CombatModuleFleetTran {
  localRotation: LocalRotation
}

export interface LocalRotation {
  w: number
}

export interface Maincraft {
  ID: number
  name: string
}

export interface Recipe {
  ID: number
  name: string
}

export interface RawMat {
  id: number
  count: number
}

export interface PreTech {
  ID: number
  name: string
}

export interface EnemyDropRange {
  x?: number
  y: number
}

export interface Handcraft {
  ID: number
  name: string
}

export interface Handcraft2 {
  ID: number
  name: string
}
