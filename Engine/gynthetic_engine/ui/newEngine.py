# -*- coding: utf-8 -*-

################################################################################
## Form generated from reading UI file 'newEngine.ui'
##
## Created by: Qt User Interface Compiler version 6.8.0
##
## WARNING! All changes made in this file will be lost when recompiling UI file!
################################################################################

from PySide6.QtCore import (QCoreApplication, QDate, QDateTime, QLocale,
    QMetaObject, QObject, QPoint, QRect,
    QSize, QTime, QUrl, Qt)
from PySide6.QtGui import (QBrush, QColor, QConicalGradient, QCursor,
    QFont, QFontDatabase, QGradient, QIcon,
    QImage, QKeySequence, QLinearGradient, QPainter,
    QPalette, QPixmap, QRadialGradient, QTransform)
from PySide6.QtWidgets import (QAbstractScrollArea, QAbstractSpinBox, QApplication, QComboBox,
    QDoubleSpinBox, QFrame, QGridLayout, QGroupBox,
    QHBoxLayout, QLCDNumber, QLabel, QLineEdit,
    QListWidget, QListWidgetItem, QMainWindow, QMenuBar,
    QProgressBar, QPushButton, QRadioButton, QScrollArea,
    QScrollBar, QSizePolicy, QSpacerItem, QSpinBox,
    QStackedWidget, QStatusBar, QTextEdit, QVBoxLayout,
    QWidget)

class Ui_MainWindow(object):
    def setupUi(self, MainWindow):
        if not MainWindow.objectName():
            MainWindow.setObjectName(u"MainWindow")
        MainWindow.setWindowModality(Qt.ApplicationModal)
        MainWindow.resize(1745, 1151)
        sizePolicy = QSizePolicy(QSizePolicy.Policy.Expanding, QSizePolicy.Policy.Expanding)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(MainWindow.sizePolicy().hasHeightForWidth())
        MainWindow.setSizePolicy(sizePolicy)
        self.centralwidget = QWidget(MainWindow)
        self.centralwidget.setObjectName(u"centralwidget")
        sizePolicy.setHeightForWidth(self.centralwidget.sizePolicy().hasHeightForWidth())
        self.centralwidget.setSizePolicy(sizePolicy)
        self.centralwidget.setStyleSheet(u"QWidget {\n"
"    background-color: #1e1e1e;\n"
"    color: #d0d0d0;\n"
"    font-family: \"JetBrains Mono\", \"Fira Code\", \"Consolas\", monospace;\n"
"    font-size: 11pt;\n"
"    border: none;\n"
"}\n"
"\n"
"QWidget#identityPhaseWidget {\n"
"background-color: rgba(0, 0, 0, 0)\n"
"}\n"
"QWidget#inputPhaseWidget {\n"
"background-color: rgba(0, 0, 0, 0)\n"
"}\n"
"QWidget#inceptionPhaseWidget {\n"
"background-color: rgba(0, 0, 0, 0)\n"
"}\n"
"QGroupBox {\n"
"    border: 1px solid #444;\n"
"    border-radius: 3px;\n"
"    margin-top: 5px;\n"
"    padding: 3px;\n"
"    font-weight: bold;\n"
"    color: #89f7fe;\n"
"}\n"
"\n"
"QGroupBox::title {\n"
"    subcontrol-origin: margin;\n"
"    subcontrol-position: top left;\n"
"    padding: 0 2px;\n"
"}\n"
"\n"
"QFrame {\n"
"    border: 1px solid #333;\n"
"    background-color: #121212;\n"
"    border-radius: 2px;\n"
"}\n"
"\n"
"QLabel {\n"
"    color: #a0a0a0;\n"
"}\n"
"\n"
"QLineEdit, QTextEdit {\n"
"    background-color: #262626;\n"
"    color: #f0f0f0;\n"
"    bord"
                        "er: 1px solid #444;\n"
"    border-radius: 2px;\n"
"    padding: 2px;\n"
"}\n"
"\n"
"QLineEdit:focus, QTextEdit:focus {\n"
"    border: 1px solid #89f7fe;\n"
"}\n"
"\n"
"QComboBox {\n"
"    background-color: #262626;\n"
"    color: #f0f0f0;\n"
"    border: 1px solid #444;\n"
"    padding: 4px;\n"
"    border-radius: 4px;\n"
"}\n"
"\n"
"QComboBox:hover {\n"
"    border: 1px solid #89f7fe;\n"
"}\n"
"\n"
"QSpinBox, QDoubleSpinBox {\n"
"    background-color: #262626;\n"
"    color: #f0f0f0;\n"
"    border: 1px solid #444;\n"
"    border-radius: 4px;\n"
"    padding: 2px;\n"
"}\n"
"\n"
"QSpinBox::up-button, QSpinBox::down-button,\n"
"QDoubleSpinBox::up-button, QDoubleSpinBox::down-button {\n"
"    background-color: #2e2e2e;\n"
"    border: none;\n"
"}\n"
"\n"
"QPushButton {\n"
"    background-color: #2d2d2d;\n"
"    border: 1px solid #555;\n"
"    padding: 6px 12px;\n"
"    border-radius: 4px;\n"
"    color: #ffffff;\n"
"}\n"
"\n"
"QPushButton:hover {\n"
"    background-color: #3e3e3e;\n"
"    border: 1px solid #89"
                        "f7fe;\n"
"    color: #89f7fe;\n"
"}\n"
"\n"
"QPushButton:pressed {\n"
"    background-color: #1b1b1b;\n"
"    border: 1px solid #f50;\n"
"    color: #f50;\n"
"}\n"
"\n"
"QScrollBar:vertical, QScrollBar:horizontal {\n"
"    background-color: #1e1e1e;\n"
"    border: none;\n"
"    width: 8px;\n"
"    margin: 0px;\n"
"}\n"
"\n"
"QScrollBar::handle {\n"
"    background: #333;\n"
"    border-radius: 4px;\n"
"}\n"
"\n"
"QScrollBar::handle:hover {\n"
"    background: #89f7fe;\n"
"}\n"
"\n"
"QScrollBar::add-line, QScrollBar::sub-line {\n"
"    background: none;\n"
"    height: 0px;\n"
"    width: 0px;\n"
"}\n"
"")
        self.verticalLayout = QVBoxLayout(self.centralwidget)
        self.verticalLayout.setObjectName(u"verticalLayout")
        self.horizontalLayout = QHBoxLayout()
        self.horizontalLayout.setObjectName(u"horizontalLayout")
        self.TemplateEditorBtn = QPushButton(self.centralwidget)
        self.TemplateEditorBtn.setObjectName(u"TemplateEditorBtn")

        self.horizontalLayout.addWidget(self.TemplateEditorBtn)

        self.LLMConfigPushBtn = QPushButton(self.centralwidget)
        self.LLMConfigPushBtn.setObjectName(u"LLMConfigPushBtn")

        self.horizontalLayout.addWidget(self.LLMConfigPushBtn)

        self.EngineBtn = QPushButton(self.centralwidget)
        self.EngineBtn.setObjectName(u"EngineBtn")

        self.horizontalLayout.addWidget(self.EngineBtn)

        self.AuditsBtn = QPushButton(self.centralwidget)
        self.AuditsBtn.setObjectName(u"AuditsBtn")

        self.horizontalLayout.addWidget(self.AuditsBtn)

        self.DashboardBtn = QPushButton(self.centralwidget)
        self.DashboardBtn.setObjectName(u"DashboardBtn")

        self.horizontalLayout.addWidget(self.DashboardBtn)


        self.verticalLayout.addLayout(self.horizontalLayout)

        self.mainStackedWidget = QStackedWidget(self.centralwidget)
        self.mainStackedWidget.setObjectName(u"mainStackedWidget")
        self.dashboardPage = QWidget()
        self.dashboardPage.setObjectName(u"dashboardPage")
        self.verticalLayout_10 = QVBoxLayout(self.dashboardPage)
        self.verticalLayout_10.setObjectName(u"verticalLayout_10")
        self.preProWidget = QWidget(self.dashboardPage)
        self.preProWidget.setObjectName(u"preProWidget")
        self.horizontalLayout_2 = QHBoxLayout(self.preProWidget)
        self.horizontalLayout_2.setObjectName(u"horizontalLayout_2")
        self.decompositionGB = QGroupBox(self.preProWidget)
        self.decompositionGB.setObjectName(u"decompositionGB")
        sizePolicy.setHeightForWidth(self.decompositionGB.sizePolicy().hasHeightForWidth())
        self.decompositionGB.setSizePolicy(sizePolicy)
        self.verticalLayout_4 = QVBoxLayout(self.decompositionGB)
        self.verticalLayout_4.setObjectName(u"verticalLayout_4")
        self.userInputFrame = QFrame(self.decompositionGB)
        self.userInputFrame.setObjectName(u"userInputFrame")
        self.userInputFrame.setFrameShape(QFrame.NoFrame)
        self.verticalLayout_5 = QVBoxLayout(self.userInputFrame)
        self.verticalLayout_5.setObjectName(u"verticalLayout_5")
        self.dash_ArcsLabel = QLabel(self.userInputFrame)
        self.dash_ArcsLabel.setObjectName(u"dash_ArcsLabel")
        self.dash_ArcsLabel.setAlignment(Qt.AlignCenter)

        self.verticalLayout_5.addWidget(self.dash_ArcsLabel)

        self.dash_ArcsTE = QTextEdit(self.userInputFrame)
        self.dash_ArcsTE.setObjectName(u"dash_ArcsTE")

        self.verticalLayout_5.addWidget(self.dash_ArcsTE)

        self.dash_UserInputLabel = QLabel(self.userInputFrame)
        self.dash_UserInputLabel.setObjectName(u"dash_UserInputLabel")
        self.dash_UserInputLabel.setAlignment(Qt.AlignLeading|Qt.AlignLeft|Qt.AlignVCenter)

        self.verticalLayout_5.addWidget(self.dash_UserInputLabel)

        self.dash_UserInputTE = QTextEdit(self.userInputFrame)
        self.dash_UserInputTE.setObjectName(u"dash_UserInputTE")

        self.verticalLayout_5.addWidget(self.dash_UserInputTE)


        self.verticalLayout_4.addWidget(self.userInputFrame)


        self.horizontalLayout_2.addWidget(self.decompositionGB)

        self.postProGB = QGroupBox(self.preProWidget)
        self.postProGB.setObjectName(u"postProGB")
        sizePolicy.setHeightForWidth(self.postProGB.sizePolicy().hasHeightForWidth())
        self.postProGB.setSizePolicy(sizePolicy)
        self.verticalLayout_3 = QVBoxLayout(self.postProGB)
        self.verticalLayout_3.setObjectName(u"verticalLayout_3")
        self.postProFrame = QFrame(self.postProGB)
        self.postProFrame.setObjectName(u"postProFrame")
        self.postProFrame.setFrameShape(QFrame.NoFrame)
        self.verticalLayout_6 = QVBoxLayout(self.postProFrame)
        self.verticalLayout_6.setObjectName(u"verticalLayout_6")
        self.dash_TriadicSummationsLabel = QLabel(self.postProFrame)
        self.dash_TriadicSummationsLabel.setObjectName(u"dash_TriadicSummationsLabel")

        self.verticalLayout_6.addWidget(self.dash_TriadicSummationsLabel)

        self.dash_TriadicSummaryTE = QTextEdit(self.postProFrame)
        self.dash_TriadicSummaryTE.setObjectName(u"dash_TriadicSummaryTE")

        self.verticalLayout_6.addWidget(self.dash_TriadicSummaryTE)

        self.pipelineBreakerGB = QGroupBox(self.postProFrame)
        self.pipelineBreakerGB.setObjectName(u"pipelineBreakerGB")
        self.pipelineBreakerGB.setMinimumSize(QSize(0, 300))
        self.verticalLayout_2 = QVBoxLayout(self.pipelineBreakerGB)
        self.verticalLayout_2.setObjectName(u"verticalLayout_2")

        self.verticalLayout_6.addWidget(self.pipelineBreakerGB)


        self.verticalLayout_3.addWidget(self.postProFrame)


        self.horizontalLayout_2.addWidget(self.postProGB)

        self.compostionGB = QGroupBox(self.preProWidget)
        self.compostionGB.setObjectName(u"compostionGB")
        sizePolicy.setHeightForWidth(self.compostionGB.sizePolicy().hasHeightForWidth())
        self.compostionGB.setSizePolicy(sizePolicy)
        self.verticalLayout_8 = QVBoxLayout(self.compostionGB)
        self.verticalLayout_8.setObjectName(u"verticalLayout_8")
        self.controlsGB = QGroupBox(self.compostionGB)
        self.controlsGB.setObjectName(u"controlsGB")
        self.verticalLayout_9 = QVBoxLayout(self.controlsGB)
        self.verticalLayout_9.setObjectName(u"verticalLayout_9")
        self.dash_ComputeTriadWidget = QWidget(self.controlsGB)
        self.dash_ComputeTriadWidget.setObjectName(u"dash_ComputeTriadWidget")
        self.horizontalLayout_55 = QHBoxLayout(self.dash_ComputeTriadWidget)
        self.horizontalLayout_55.setObjectName(u"horizontalLayout_55")

        self.verticalLayout_9.addWidget(self.dash_ComputeTriadWidget)

        self.gridLayout_6 = QGridLayout()
        self.gridLayout_6.setObjectName(u"gridLayout_6")
        self.arcRB_Widget = QWidget(self.controlsGB)
        self.arcRB_Widget.setObjectName(u"arcRB_Widget")
        self.arcRB_Widget.setMinimumSize(QSize(50, 0))
        self.arcRB_Widget.setLayoutDirection(Qt.RightToLeft)
        self.verticalLayout_99 = QVBoxLayout(self.arcRB_Widget)
        self.verticalLayout_99.setObjectName(u"verticalLayout_99")
        self.dash_ArcRB_1 = QRadioButton(self.arcRB_Widget)
        self.dash_ArcRB_1.setObjectName(u"dash_ArcRB_1")
        self.dash_ArcRB_1.setMinimumSize(QSize(50, 0))

        self.verticalLayout_99.addWidget(self.dash_ArcRB_1)

        self.dash_ArcRB_2 = QRadioButton(self.arcRB_Widget)
        self.dash_ArcRB_2.setObjectName(u"dash_ArcRB_2")
        self.dash_ArcRB_2.setMinimumSize(QSize(50, 0))

        self.verticalLayout_99.addWidget(self.dash_ArcRB_2)

        self.dash_ArcRB_3 = QRadioButton(self.arcRB_Widget)
        self.dash_ArcRB_3.setObjectName(u"dash_ArcRB_3")
        self.dash_ArcRB_3.setMinimumSize(QSize(50, 0))

        self.verticalLayout_99.addWidget(self.dash_ArcRB_3)

        self.dash_ArcRB_4 = QRadioButton(self.arcRB_Widget)
        self.dash_ArcRB_4.setObjectName(u"dash_ArcRB_4")
        sizePolicy1 = QSizePolicy(QSizePolicy.Policy.Minimum, QSizePolicy.Policy.Fixed)
        sizePolicy1.setHorizontalStretch(0)
        sizePolicy1.setVerticalStretch(0)
        sizePolicy1.setHeightForWidth(self.dash_ArcRB_4.sizePolicy().hasHeightForWidth())
        self.dash_ArcRB_4.setSizePolicy(sizePolicy1)
        self.dash_ArcRB_4.setMinimumSize(QSize(50, 0))

        self.verticalLayout_99.addWidget(self.dash_ArcRB_4)

        self.dash_ArcRB_5 = QRadioButton(self.arcRB_Widget)
        self.dash_ArcRB_5.setObjectName(u"dash_ArcRB_5")
        self.dash_ArcRB_5.setMinimumSize(QSize(50, 0))

        self.verticalLayout_99.addWidget(self.dash_ArcRB_5)

        self.dash_ArcRB_6 = QRadioButton(self.arcRB_Widget)
        self.dash_ArcRB_6.setObjectName(u"dash_ArcRB_6")
        self.dash_ArcRB_6.setMinimumSize(QSize(50, 0))

        self.verticalLayout_99.addWidget(self.dash_ArcRB_6)

        self.dash_ArcRB_7 = QRadioButton(self.arcRB_Widget)
        self.dash_ArcRB_7.setObjectName(u"dash_ArcRB_7")
        self.dash_ArcRB_7.setMinimumSize(QSize(50, 0))

        self.verticalLayout_99.addWidget(self.dash_ArcRB_7)


        self.gridLayout_6.addWidget(self.arcRB_Widget, 0, 2, 1, 1)

        self.triadCompletionLightsGB = QGroupBox(self.controlsGB)
        self.triadCompletionLightsGB.setObjectName(u"triadCompletionLightsGB")
        self.triadCompletionLightsGB.setAlignment(Qt.AlignCenter)
        self.horizontalLayout_59 = QHBoxLayout(self.triadCompletionLightsGB)
        self.horizontalLayout_59.setObjectName(u"horizontalLayout_59")
        self.inputPhase_TriadLightBarWidfget = QWidget(self.triadCompletionLightsGB)
        self.inputPhase_TriadLightBarWidfget.setObjectName(u"inputPhase_TriadLightBarWidfget")
        self.verticalLayout_96 = QVBoxLayout(self.inputPhase_TriadLightBarWidfget)
        self.verticalLayout_96.setObjectName(u"verticalLayout_96")
        self.idiotLight_Arc_1 = QLabel(self.inputPhase_TriadLightBarWidfget)
        self.idiotLight_Arc_1.setObjectName(u"idiotLight_Arc_1")
        self.idiotLight_Arc_1.setStyleSheet(u"background-color: black;\n"
"border-radius: 10px;\n"
"min-width: 20px;\n"
"min-height: 20px;\n"
"")

        self.verticalLayout_96.addWidget(self.idiotLight_Arc_1)

        self.idiotLight_Arc_2 = QLabel(self.inputPhase_TriadLightBarWidfget)
        self.idiotLight_Arc_2.setObjectName(u"idiotLight_Arc_2")
        self.idiotLight_Arc_2.setStyleSheet(u"background-color: black;\n"
"border-radius: 10px;\n"
"min-width: 20px;\n"
"min-height: 20px;\n"
"")

        self.verticalLayout_96.addWidget(self.idiotLight_Arc_2)

        self.idiotLight_Arc_3 = QLabel(self.inputPhase_TriadLightBarWidfget)
        self.idiotLight_Arc_3.setObjectName(u"idiotLight_Arc_3")
        self.idiotLight_Arc_3.setStyleSheet(u"background-color: black;\n"
"border-radius: 10px;\n"
"min-width: 20px;\n"
"min-height: 20px;\n"
"")

        self.verticalLayout_96.addWidget(self.idiotLight_Arc_3)

        self.idiotLight_Arc_4 = QLabel(self.inputPhase_TriadLightBarWidfget)
        self.idiotLight_Arc_4.setObjectName(u"idiotLight_Arc_4")
        self.idiotLight_Arc_4.setStyleSheet(u"background-color: black;\n"
"border-radius: 10px;\n"
"min-width: 20px;\n"
"min-height: 20px;\n"
"")

        self.verticalLayout_96.addWidget(self.idiotLight_Arc_4)

        self.idiotLight_Arc_5 = QLabel(self.inputPhase_TriadLightBarWidfget)
        self.idiotLight_Arc_5.setObjectName(u"idiotLight_Arc_5")
        self.idiotLight_Arc_5.setStyleSheet(u"background-color: black;\n"
"border-radius: 10px;\n"
"min-width: 20px;\n"
"min-height: 20px;\n"
"")

        self.verticalLayout_96.addWidget(self.idiotLight_Arc_5)

        self.idiotLight_Arc_6 = QLabel(self.inputPhase_TriadLightBarWidfget)
        self.idiotLight_Arc_6.setObjectName(u"idiotLight_Arc_6")
        self.idiotLight_Arc_6.setStyleSheet(u"background-color: black;\n"
"border-radius: 10px;\n"
"min-width: 20px;\n"
"min-height: 20px;\n"
"")

        self.verticalLayout_96.addWidget(self.idiotLight_Arc_6)

        self.idiotLight_Arc_7 = QLabel(self.inputPhase_TriadLightBarWidfget)
        self.idiotLight_Arc_7.setObjectName(u"idiotLight_Arc_7")
        self.idiotLight_Arc_7.setStyleSheet(u"background-color: black;\n"
"border-radius: 10px;\n"
"min-width: 20px;\n"
"min-height: 20px;\n"
"")

        self.verticalLayout_96.addWidget(self.idiotLight_Arc_7)


        self.horizontalLayout_59.addWidget(self.inputPhase_TriadLightBarWidfget)

        self.inputPhase_TriadLightBarWidfget_2 = QWidget(self.triadCompletionLightsGB)
        self.inputPhase_TriadLightBarWidfget_2.setObjectName(u"inputPhase_TriadLightBarWidfget_2")
        self.verticalLayout_97 = QVBoxLayout(self.inputPhase_TriadLightBarWidfget_2)
        self.verticalLayout_97.setObjectName(u"verticalLayout_97")
        self.idiotLight_Arc_8 = QLabel(self.inputPhase_TriadLightBarWidfget_2)
        self.idiotLight_Arc_8.setObjectName(u"idiotLight_Arc_8")
        self.idiotLight_Arc_8.setStyleSheet(u"background-color: black;\n"
"border-radius: 10px;\n"
"min-width: 20px;\n"
"min-height: 20px;\n"
"")

        self.verticalLayout_97.addWidget(self.idiotLight_Arc_8)

        self.idiotLight_Arc_9 = QLabel(self.inputPhase_TriadLightBarWidfget_2)
        self.idiotLight_Arc_9.setObjectName(u"idiotLight_Arc_9")
        self.idiotLight_Arc_9.setStyleSheet(u"background-color: black;\n"
"border-radius: 10px;\n"
"min-width: 20px;\n"
"min-height: 20px;\n"
"")

        self.verticalLayout_97.addWidget(self.idiotLight_Arc_9)

        self.idiotLight_Arc_10 = QLabel(self.inputPhase_TriadLightBarWidfget_2)
        self.idiotLight_Arc_10.setObjectName(u"idiotLight_Arc_10")
        self.idiotLight_Arc_10.setStyleSheet(u"background-color: black;\n"
"border-radius: 10px;\n"
"min-width: 20px;\n"
"min-height: 20px;\n"
"")

        self.verticalLayout_97.addWidget(self.idiotLight_Arc_10)

        self.idiotLight_Arc_11 = QLabel(self.inputPhase_TriadLightBarWidfget_2)
        self.idiotLight_Arc_11.setObjectName(u"idiotLight_Arc_11")
        self.idiotLight_Arc_11.setStyleSheet(u"background-color: black;\n"
"border-radius: 10px;\n"
"min-width: 20px;\n"
"min-height: 20px;\n"
"")

        self.verticalLayout_97.addWidget(self.idiotLight_Arc_11)

        self.idiotLight_Arc_12 = QLabel(self.inputPhase_TriadLightBarWidfget_2)
        self.idiotLight_Arc_12.setObjectName(u"idiotLight_Arc_12")
        self.idiotLight_Arc_12.setStyleSheet(u"background-color: black;\n"
"border-radius: 10px;\n"
"min-width: 20px;\n"
"min-height: 20px;\n"
"")

        self.verticalLayout_97.addWidget(self.idiotLight_Arc_12)

        self.idiotLight_Arc_13 = QLabel(self.inputPhase_TriadLightBarWidfget_2)
        self.idiotLight_Arc_13.setObjectName(u"idiotLight_Arc_13")
        self.idiotLight_Arc_13.setStyleSheet(u"background-color: black;\n"
"border-radius: 10px;\n"
"min-width: 20px;\n"
"min-height: 20px;\n"
"")

        self.verticalLayout_97.addWidget(self.idiotLight_Arc_13)

        self.idiotLight_Arc_14 = QLabel(self.inputPhase_TriadLightBarWidfget_2)
        self.idiotLight_Arc_14.setObjectName(u"idiotLight_Arc_14")
        self.idiotLight_Arc_14.setStyleSheet(u"background-color: black;\n"
"border-radius: 10px;\n"
"min-width: 20px;\n"
"min-height: 20px;\n"
"")

        self.verticalLayout_97.addWidget(self.idiotLight_Arc_14)


        self.horizontalLayout_59.addWidget(self.inputPhase_TriadLightBarWidfget_2)

        self.inputPhase_TriadLightBarWidfget_3 = QWidget(self.triadCompletionLightsGB)
        self.inputPhase_TriadLightBarWidfget_3.setObjectName(u"inputPhase_TriadLightBarWidfget_3")
        self.verticalLayout_98 = QVBoxLayout(self.inputPhase_TriadLightBarWidfget_3)
        self.verticalLayout_98.setObjectName(u"verticalLayout_98")
        self.idiotLight_Arc_15 = QLabel(self.inputPhase_TriadLightBarWidfget_3)
        self.idiotLight_Arc_15.setObjectName(u"idiotLight_Arc_15")
        self.idiotLight_Arc_15.setStyleSheet(u"background-color: black;\n"
"border-radius: 10px;\n"
"min-width: 20px;\n"
"min-height: 20px;\n"
"")

        self.verticalLayout_98.addWidget(self.idiotLight_Arc_15)

        self.idiotLight_Arc_16 = QLabel(self.inputPhase_TriadLightBarWidfget_3)
        self.idiotLight_Arc_16.setObjectName(u"idiotLight_Arc_16")
        self.idiotLight_Arc_16.setStyleSheet(u"background-color: black;\n"
"border-radius: 10px;\n"
"min-width: 20px;\n"
"min-height: 20px;\n"
"")

        self.verticalLayout_98.addWidget(self.idiotLight_Arc_16)

        self.idiotLight_Arc_17 = QLabel(self.inputPhase_TriadLightBarWidfget_3)
        self.idiotLight_Arc_17.setObjectName(u"idiotLight_Arc_17")
        self.idiotLight_Arc_17.setStyleSheet(u"background-color: black;\n"
"border-radius: 10px;\n"
"min-width: 20px;\n"
"min-height: 20px;\n"
"")

        self.verticalLayout_98.addWidget(self.idiotLight_Arc_17)

        self.idiotLight_Arc_18 = QLabel(self.inputPhase_TriadLightBarWidfget_3)
        self.idiotLight_Arc_18.setObjectName(u"idiotLight_Arc_18")
        self.idiotLight_Arc_18.setStyleSheet(u"background-color: black;\n"
"border-radius: 10px;\n"
"min-width: 20px;\n"
"min-height: 20px;\n"
"")

        self.verticalLayout_98.addWidget(self.idiotLight_Arc_18)

        self.idiotLight_Arc_19 = QLabel(self.inputPhase_TriadLightBarWidfget_3)
        self.idiotLight_Arc_19.setObjectName(u"idiotLight_Arc_19")
        self.idiotLight_Arc_19.setStyleSheet(u"background-color: black;\n"
"border-radius: 10px;\n"
"min-width: 20px;\n"
"min-height: 20px;\n"
"")

        self.verticalLayout_98.addWidget(self.idiotLight_Arc_19)

        self.idiotLight_Arc_20 = QLabel(self.inputPhase_TriadLightBarWidfget_3)
        self.idiotLight_Arc_20.setObjectName(u"idiotLight_Arc_20")
        self.idiotLight_Arc_20.setStyleSheet(u"background-color: black;\n"
"border-radius: 10px;\n"
"min-width: 20px;\n"
"min-height: 20px;\n"
"")

        self.verticalLayout_98.addWidget(self.idiotLight_Arc_20)

        self.idiotLight_Arc_21 = QLabel(self.inputPhase_TriadLightBarWidfget_3)
        self.idiotLight_Arc_21.setObjectName(u"idiotLight_Arc_21")
        self.idiotLight_Arc_21.setStyleSheet(u"background-color: black;\n"
"border-radius: 10px;\n"
"min-width: 20px;\n"
"min-height: 20px;\n"
"")

        self.verticalLayout_98.addWidget(self.idiotLight_Arc_21)


        self.horizontalLayout_59.addWidget(self.inputPhase_TriadLightBarWidfget_3)

        self.horizontalSpacer_5 = QSpacerItem(40, 20, QSizePolicy.Policy.Fixed, QSizePolicy.Policy.Minimum)

        self.horizontalLayout_59.addItem(self.horizontalSpacer_5)


        self.gridLayout_6.addWidget(self.triadCompletionLightsGB, 0, 3, 1, 1)

        self.horizontalSpacer_9 = QSpacerItem(100, 20, QSizePolicy.Policy.Fixed, QSizePolicy.Policy.Minimum)

        self.gridLayout_6.addItem(self.horizontalSpacer_9, 0, 0, 1, 1)

        self.verticalLayout_82 = QVBoxLayout()
        self.verticalLayout_82.setObjectName(u"verticalLayout_82")
        self.dash_ComputeFirstTriadBtn = QPushButton(self.controlsGB)
        self.dash_ComputeFirstTriadBtn.setObjectName(u"dash_ComputeFirstTriadBtn")
        self.dash_ComputeFirstTriadBtn.setMinimumSize(QSize(50, 0))
        font = QFont()
        font.setFamilies([u"JetBrains Mono"])
        font.setPointSize(11)
        self.dash_ComputeFirstTriadBtn.setFont(font)

        self.verticalLayout_82.addWidget(self.dash_ComputeFirstTriadBtn)

        self.dash_ComputeSecondTriadBtn = QPushButton(self.controlsGB)
        self.dash_ComputeSecondTriadBtn.setObjectName(u"dash_ComputeSecondTriadBtn")
        self.dash_ComputeSecondTriadBtn.setMinimumSize(QSize(50, 0))

        self.verticalLayout_82.addWidget(self.dash_ComputeSecondTriadBtn)

        self.dash_ComputeThirdTriadBtn = QPushButton(self.controlsGB)
        self.dash_ComputeThirdTriadBtn.setObjectName(u"dash_ComputeThirdTriadBtn")
        sizePolicy1.setHeightForWidth(self.dash_ComputeThirdTriadBtn.sizePolicy().hasHeightForWidth())
        self.dash_ComputeThirdTriadBtn.setSizePolicy(sizePolicy1)
        self.dash_ComputeThirdTriadBtn.setMinimumSize(QSize(50, 0))

        self.verticalLayout_82.addWidget(self.dash_ComputeThirdTriadBtn)


        self.gridLayout_6.addLayout(self.verticalLayout_82, 0, 1, 1, 1)


        self.verticalLayout_9.addLayout(self.gridLayout_6)

        self.horizontalLayout_60 = QHBoxLayout()
        self.horizontalLayout_60.setObjectName(u"horizontalLayout_60")
        self.dash_runInferenceBtn = QPushButton(self.controlsGB)
        self.dash_runInferenceBtn.setObjectName(u"dash_runInferenceBtn")

        self.horizontalLayout_60.addWidget(self.dash_runInferenceBtn)


        self.verticalLayout_9.addLayout(self.horizontalLayout_60)

        self.tokensGB = QGroupBox(self.controlsGB)
        self.tokensGB.setObjectName(u"tokensGB")
        self.verticalLayout_7 = QVBoxLayout(self.tokensGB)
        self.verticalLayout_7.setObjectName(u"verticalLayout_7")
        self.horizontalLayout_13 = QHBoxLayout()
        self.horizontalLayout_13.setObjectName(u"horizontalLayout_13")
        self.perCall_Label = QLabel(self.tokensGB)
        self.perCall_Label.setObjectName(u"perCall_Label")

        self.horizontalLayout_13.addWidget(self.perCall_Label)

        self.sessTotal_Label = QLabel(self.tokensGB)
        self.sessTotal_Label.setObjectName(u"sessTotal_Label")

        self.horizontalLayout_13.addWidget(self.sessTotal_Label)


        self.verticalLayout_7.addLayout(self.horizontalLayout_13)

        self.horizontalLayout_3 = QHBoxLayout()
        self.horizontalLayout_3.setObjectName(u"horizontalLayout_3")
        self.horizontalLayout_3.setContentsMargins(3, 3, 3, 3)
        self.setQuotaBtn = QPushButton(self.tokensGB)
        self.setQuotaBtn.setObjectName(u"setQuotaBtn")
        sizePolicy.setHeightForWidth(self.setQuotaBtn.sizePolicy().hasHeightForWidth())
        self.setQuotaBtn.setSizePolicy(sizePolicy)
        self.setQuotaBtn.setMinimumSize(QSize(0, 0))
        self.setQuotaBtn.setFont(font)

        self.horizontalLayout_3.addWidget(self.setQuotaBtn)

        self.setPerCall_LE = QLineEdit(self.tokensGB)
        self.setPerCall_LE.setObjectName(u"setPerCall_LE")
        sizePolicy.setHeightForWidth(self.setPerCall_LE.sizePolicy().hasHeightForWidth())
        self.setPerCall_LE.setSizePolicy(sizePolicy)
        self.setPerCall_LE.setMinimumSize(QSize(0, 0))

        self.horizontalLayout_3.addWidget(self.setPerCall_LE)

        self.setSessToatal_LE = QLineEdit(self.tokensGB)
        self.setSessToatal_LE.setObjectName(u"setSessToatal_LE")
        sizePolicy.setHeightForWidth(self.setSessToatal_LE.sizePolicy().hasHeightForWidth())
        self.setSessToatal_LE.setSizePolicy(sizePolicy)
        self.setSessToatal_LE.setMinimumSize(QSize(0, 0))

        self.horizontalLayout_3.addWidget(self.setSessToatal_LE)


        self.verticalLayout_7.addLayout(self.horizontalLayout_3)

        self.horizontalLayout_4 = QHBoxLayout()
        self.horizontalLayout_4.setObjectName(u"horizontalLayout_4")

        self.verticalLayout_7.addLayout(self.horizontalLayout_4)

        self.horizontalLayout_14 = QHBoxLayout()
        self.horizontalLayout_14.setObjectName(u"horizontalLayout_14")
        self.usedTokensLabel = QLabel(self.tokensGB)
        self.usedTokensLabel.setObjectName(u"usedTokensLabel")

        self.horizontalLayout_14.addWidget(self.usedTokensLabel)

        self.tokensUsedPerCall_LCD = QLCDNumber(self.tokensGB)
        self.tokensUsedPerCall_LCD.setObjectName(u"tokensUsedPerCall_LCD")

        self.horizontalLayout_14.addWidget(self.tokensUsedPerCall_LCD)


        self.verticalLayout_7.addLayout(self.horizontalLayout_14)

        self.sessUseLabel = QLabel(self.tokensGB)
        self.sessUseLabel.setObjectName(u"sessUseLabel")

        self.verticalLayout_7.addWidget(self.sessUseLabel)

        self.resetStatsBtn = QPushButton(self.tokensGB)
        self.resetStatsBtn.setObjectName(u"resetStatsBtn")
        sizePolicy2 = QSizePolicy(QSizePolicy.Policy.Minimum, QSizePolicy.Policy.Expanding)
        sizePolicy2.setHorizontalStretch(0)
        sizePolicy2.setVerticalStretch(0)
        sizePolicy2.setHeightForWidth(self.resetStatsBtn.sizePolicy().hasHeightForWidth())
        self.resetStatsBtn.setSizePolicy(sizePolicy2)

        self.verticalLayout_7.addWidget(self.resetStatsBtn)

        self.sessUse_Quota_PB = QProgressBar(self.tokensGB)
        self.sessUse_Quota_PB.setObjectName(u"sessUse_Quota_PB")
        self.sessUse_Quota_PB.setValue(0)
        self.sessUse_Quota_PB.setInvertedAppearance(False)

        self.verticalLayout_7.addWidget(self.sessUse_Quota_PB)

        self.verticalLayout_7.setStretch(0, 1)
        self.verticalLayout_7.setStretch(1, 1)
        self.verticalLayout_7.setStretch(2, 1)
        self.verticalLayout_7.setStretch(3, 1)
        self.verticalLayout_7.setStretch(4, 1)
        self.verticalLayout_7.setStretch(6, 1)

        self.verticalLayout_9.addWidget(self.tokensGB)


        self.verticalLayout_8.addWidget(self.controlsGB)


        self.horizontalLayout_2.addWidget(self.compostionGB)


        self.verticalLayout_10.addWidget(self.preProWidget)

        self.modelStatsBreakerWidget = QWidget(self.dashboardPage)
        self.modelStatsBreakerWidget.setObjectName(u"modelStatsBreakerWidget")
        self.horizontalLayout_12 = QHBoxLayout(self.modelStatsBreakerWidget)
        self.horizontalLayout_12.setObjectName(u"horizontalLayout_12")
        self.inputModelGB = QGroupBox(self.modelStatsBreakerWidget)
        self.inputModelGB.setObjectName(u"inputModelGB")
        self.gridLayout = QGridLayout(self.inputModelGB)
        self.gridLayout.setObjectName(u"gridLayout")
        self.tempSetLCD_IM = QLCDNumber(self.inputModelGB)
        self.tempSetLCD_IM.setObjectName(u"tempSetLCD_IM")

        self.gridLayout.addWidget(self.tempSetLCD_IM, 1, 1, 1, 1)

        self.topP_Label_IM = QLabel(self.inputModelGB)
        self.topP_Label_IM.setObjectName(u"topP_Label_IM")

        self.gridLayout.addWidget(self.topP_Label_IM, 5, 0, 1, 1)

        self.printPreview_IM = QPushButton(self.inputModelGB)
        self.printPreview_IM.setObjectName(u"printPreview_IM")

        self.gridLayout.addWidget(self.printPreview_IM, 7, 1, 1, 1)

        self.modelStatusLabel_IM = QLabel(self.inputModelGB)
        self.modelStatusLabel_IM.setObjectName(u"modelStatusLabel_IM")

        self.gridLayout.addWidget(self.modelStatusLabel_IM, 0, 0, 1, 1)

        self.freqqLabel_IM = QLabel(self.inputModelGB)
        self.freqqLabel_IM.setObjectName(u"freqqLabel_IM")

        self.gridLayout.addWidget(self.freqqLabel_IM, 4, 0, 1, 1)

        self.StatusLabel_IM = QLabel(self.inputModelGB)
        self.StatusLabel_IM.setObjectName(u"StatusLabel_IM")

        self.gridLayout.addWidget(self.StatusLabel_IM, 0, 1, 1, 1)

        self.freqSetLCD_IM = QLCDNumber(self.inputModelGB)
        self.freqSetLCD_IM.setObjectName(u"freqSetLCD_IM")

        self.gridLayout.addWidget(self.freqSetLCD_IM, 4, 1, 1, 1)

        self.tuningBtn_IM = QPushButton(self.inputModelGB)
        self.tuningBtn_IM.setObjectName(u"tuningBtn_IM")

        self.gridLayout.addWidget(self.tuningBtn_IM, 7, 0, 1, 1)

        self.topKSetLCD_IM = QLCDNumber(self.inputModelGB)
        self.topKSetLCD_IM.setObjectName(u"topKSetLCD_IM")

        self.gridLayout.addWidget(self.topKSetLCD_IM, 6, 1, 1, 1)

        self.presLabel_IM = QLabel(self.inputModelGB)
        self.presLabel_IM.setObjectName(u"presLabel_IM")

        self.gridLayout.addWidget(self.presLabel_IM, 2, 0, 1, 1)

        self.tempLabel_IM = QLabel(self.inputModelGB)
        self.tempLabel_IM.setObjectName(u"tempLabel_IM")

        self.gridLayout.addWidget(self.tempLabel_IM, 1, 0, 1, 1)

        self.topK_Label_IM = QLabel(self.inputModelGB)
        self.topK_Label_IM.setObjectName(u"topK_Label_IM")

        self.gridLayout.addWidget(self.topK_Label_IM, 6, 0, 1, 1)

        self.topPSetLCD_IM = QLCDNumber(self.inputModelGB)
        self.topPSetLCD_IM.setObjectName(u"topPSetLCD_IM")

        self.gridLayout.addWidget(self.topPSetLCD_IM, 5, 1, 1, 1)

        self.presSetLCD_IM = QLCDNumber(self.inputModelGB)
        self.presSetLCD_IM.setObjectName(u"presSetLCD_IM")

        self.gridLayout.addWidget(self.presSetLCD_IM, 3, 1, 1, 1)


        self.horizontalLayout_12.addWidget(self.inputModelGB)

        self.modelGB_Con = QGroupBox(self.modelStatsBreakerWidget)
        self.modelGB_Con.setObjectName(u"modelGB_Con")
        self.gridLayout_5 = QGridLayout(self.modelGB_Con)
        self.gridLayout_5.setObjectName(u"gridLayout_5")
        self.modelStatusLabel_Con = QLabel(self.modelGB_Con)
        self.modelStatusLabel_Con.setObjectName(u"modelStatusLabel_Con")

        self.gridLayout_5.addWidget(self.modelStatusLabel_Con, 0, 0, 1, 1)

        self.topP_Label_Con = QLabel(self.modelGB_Con)
        self.topP_Label_Con.setObjectName(u"topP_Label_Con")

        self.gridLayout_5.addWidget(self.topP_Label_Con, 4, 0, 1, 1)

        self.freqLabel_Con = QLabel(self.modelGB_Con)
        self.freqLabel_Con.setObjectName(u"freqLabel_Con")

        self.gridLayout_5.addWidget(self.freqLabel_Con, 3, 0, 1, 1)

        self.tempSetLCD_Con = QLCDNumber(self.modelGB_Con)
        self.tempSetLCD_Con.setObjectName(u"tempSetLCD_Con")

        self.gridLayout_5.addWidget(self.tempSetLCD_Con, 1, 1, 1, 1)

        self.tempLabel_Con = QLabel(self.modelGB_Con)
        self.tempLabel_Con.setObjectName(u"tempLabel_Con")

        self.gridLayout_5.addWidget(self.tempLabel_Con, 1, 0, 1, 1)

        self.presLabel_Con = QLabel(self.modelGB_Con)
        self.presLabel_Con.setObjectName(u"presLabel_Con")

        self.gridLayout_5.addWidget(self.presLabel_Con, 2, 0, 1, 1)

        self.topPSetLCD_Con = QLCDNumber(self.modelGB_Con)
        self.topPSetLCD_Con.setObjectName(u"topPSetLCD_Con")

        self.gridLayout_5.addWidget(self.topPSetLCD_Con, 4, 1, 1, 1)

        self.topK_Label_Con = QLabel(self.modelGB_Con)
        self.topK_Label_Con.setObjectName(u"topK_Label_Con")

        self.gridLayout_5.addWidget(self.topK_Label_Con, 5, 0, 1, 1)

        self.freqSetLCD_Con = QLCDNumber(self.modelGB_Con)
        self.freqSetLCD_Con.setObjectName(u"freqSetLCD_Con")

        self.gridLayout_5.addWidget(self.freqSetLCD_Con, 3, 1, 1, 1)

        self.presSetLCD_Con = QLCDNumber(self.modelGB_Con)
        self.presSetLCD_Con.setObjectName(u"presSetLCD_Con")

        self.gridLayout_5.addWidget(self.presSetLCD_Con, 2, 1, 1, 1)

        self.tuningBtn_Con = QPushButton(self.modelGB_Con)
        self.tuningBtn_Con.setObjectName(u"tuningBtn_Con")

        self.gridLayout_5.addWidget(self.tuningBtn_Con, 6, 0, 1, 1)

        self.printPreviewBtn_Con = QPushButton(self.modelGB_Con)
        self.printPreviewBtn_Con.setObjectName(u"printPreviewBtn_Con")

        self.gridLayout_5.addWidget(self.printPreviewBtn_Con, 6, 1, 1, 1)

        self.topKSetLCD_Con = QLCDNumber(self.modelGB_Con)
        self.topKSetLCD_Con.setObjectName(u"topKSetLCD_Con")

        self.gridLayout_5.addWidget(self.topKSetLCD_Con, 5, 1, 1, 1)

        self.StatusLabel_Con = QLabel(self.modelGB_Con)
        self.StatusLabel_Con.setObjectName(u"StatusLabel_Con")

        self.gridLayout_5.addWidget(self.StatusLabel_Con, 0, 1, 1, 1)


        self.horizontalLayout_12.addWidget(self.modelGB_Con)

        self.OutputMiodelGB = QGroupBox(self.modelStatsBreakerWidget)
        self.OutputMiodelGB.setObjectName(u"OutputMiodelGB")
        self.gridLayout_2 = QGridLayout(self.OutputMiodelGB)
        self.gridLayout_2.setObjectName(u"gridLayout_2")
        self.modelStatusLabel_OM = QLabel(self.OutputMiodelGB)
        self.modelStatusLabel_OM.setObjectName(u"modelStatusLabel_OM")

        self.gridLayout_2.addWidget(self.modelStatusLabel_OM, 0, 0, 1, 1)

        self.topP_Label_OM = QLabel(self.OutputMiodelGB)
        self.topP_Label_OM.setObjectName(u"topP_Label_OM")

        self.gridLayout_2.addWidget(self.topP_Label_OM, 4, 0, 1, 1)

        self.freqLabel_OM = QLabel(self.OutputMiodelGB)
        self.freqLabel_OM.setObjectName(u"freqLabel_OM")

        self.gridLayout_2.addWidget(self.freqLabel_OM, 3, 0, 1, 1)

        self.tempSetLCD_OM = QLCDNumber(self.OutputMiodelGB)
        self.tempSetLCD_OM.setObjectName(u"tempSetLCD_OM")

        self.gridLayout_2.addWidget(self.tempSetLCD_OM, 1, 1, 1, 1)

        self.tempLabel_OM = QLabel(self.OutputMiodelGB)
        self.tempLabel_OM.setObjectName(u"tempLabel_OM")

        self.gridLayout_2.addWidget(self.tempLabel_OM, 1, 0, 1, 1)

        self.presLabel_OM = QLabel(self.OutputMiodelGB)
        self.presLabel_OM.setObjectName(u"presLabel_OM")

        self.gridLayout_2.addWidget(self.presLabel_OM, 2, 0, 1, 1)

        self.topPSetLCD_OM = QLCDNumber(self.OutputMiodelGB)
        self.topPSetLCD_OM.setObjectName(u"topPSetLCD_OM")

        self.gridLayout_2.addWidget(self.topPSetLCD_OM, 4, 1, 1, 1)

        self.topK_Label_OM = QLabel(self.OutputMiodelGB)
        self.topK_Label_OM.setObjectName(u"topK_Label_OM")

        self.gridLayout_2.addWidget(self.topK_Label_OM, 5, 0, 1, 1)

        self.freqSetLCD_OM = QLCDNumber(self.OutputMiodelGB)
        self.freqSetLCD_OM.setObjectName(u"freqSetLCD_OM")

        self.gridLayout_2.addWidget(self.freqSetLCD_OM, 3, 1, 1, 1)

        self.presSetLCD_OM = QLCDNumber(self.OutputMiodelGB)
        self.presSetLCD_OM.setObjectName(u"presSetLCD_OM")

        self.gridLayout_2.addWidget(self.presSetLCD_OM, 2, 1, 1, 1)

        self.tuningBtn_OM = QPushButton(self.OutputMiodelGB)
        self.tuningBtn_OM.setObjectName(u"tuningBtn_OM")

        self.gridLayout_2.addWidget(self.tuningBtn_OM, 6, 0, 1, 1)

        self.printPreviewBtn_OM = QPushButton(self.OutputMiodelGB)
        self.printPreviewBtn_OM.setObjectName(u"printPreviewBtn_OM")

        self.gridLayout_2.addWidget(self.printPreviewBtn_OM, 6, 1, 1, 1)

        self.topKSetLCD_OM = QLCDNumber(self.OutputMiodelGB)
        self.topKSetLCD_OM.setObjectName(u"topKSetLCD_OM")

        self.gridLayout_2.addWidget(self.topKSetLCD_OM, 5, 1, 1, 1)

        self.StatusLabel_OM = QLabel(self.OutputMiodelGB)
        self.StatusLabel_OM.setObjectName(u"StatusLabel_OM")

        self.gridLayout_2.addWidget(self.StatusLabel_OM, 0, 1, 1, 1)


        self.horizontalLayout_12.addWidget(self.OutputMiodelGB)


        self.verticalLayout_10.addWidget(self.modelStatsBreakerWidget)

        self.mainStackedWidget.addWidget(self.dashboardPage)
        self.LLM_ConfigPage = QWidget()
        self.LLM_ConfigPage.setObjectName(u"LLM_ConfigPage")
        self.verticalLayout_11 = QVBoxLayout(self.LLM_ConfigPage)
        self.verticalLayout_11.setObjectName(u"verticalLayout_11")
        self.LLMstackedWidget = QStackedWidget(self.LLM_ConfigPage)
        self.LLMstackedWidget.setObjectName(u"LLMstackedWidget")
        self.page_2 = QWidget()
        self.page_2.setObjectName(u"page_2")
        self.horizontalLayout_56 = QHBoxLayout(self.page_2)
        self.horizontalLayout_56.setObjectName(u"horizontalLayout_56")
        self.decomposer_ModelWidget = QWidget(self.page_2)
        self.decomposer_ModelWidget.setObjectName(u"decomposer_ModelWidget")
        self.verticalLayout_83 = QVBoxLayout(self.decomposer_ModelWidget)
        self.verticalLayout_83.setObjectName(u"verticalLayout_83")
        self.horizontalLayout_45 = QHBoxLayout()
        self.horizontalLayout_45.setObjectName(u"horizontalLayout_45")
        self.decomposer_NameLabel = QLabel(self.decomposer_ModelWidget)
        self.decomposer_NameLabel.setObjectName(u"decomposer_NameLabel")

        self.horizontalLayout_45.addWidget(self.decomposer_NameLabel)

        self.decomposerAgentNameLE = QLineEdit(self.decomposer_ModelWidget)
        self.decomposerAgentNameLE.setObjectName(u"decomposerAgentNameLE")

        self.horizontalLayout_45.addWidget(self.decomposerAgentNameLE)


        self.verticalLayout_83.addLayout(self.horizontalLayout_45)

        self.HorizontalLO = QHBoxLayout()
        self.HorizontalLO.setObjectName(u"HorizontalLO")
        self.decomposer_ID_Label = QLabel(self.decomposer_ModelWidget)
        self.decomposer_ID_Label.setObjectName(u"decomposer_ID_Label")

        self.HorizontalLO.addWidget(self.decomposer_ID_Label)

        self.decomposer_ID_LE = QLineEdit(self.decomposer_ModelWidget)
        self.decomposer_ID_LE.setObjectName(u"decomposer_ID_LE")

        self.HorizontalLO.addWidget(self.decomposer_ID_LE)


        self.verticalLayout_83.addLayout(self.HorizontalLO)

        self.horizontalLayout_44 = QHBoxLayout()
        self.horizontalLayout_44.setObjectName(u"horizontalLayout_44")
        self.decomposer_API_KeyLabel = QLabel(self.decomposer_ModelWidget)
        self.decomposer_API_KeyLabel.setObjectName(u"decomposer_API_KeyLabel")

        self.horizontalLayout_44.addWidget(self.decomposer_API_KeyLabel)

        self.decomposer_API_KeyLE = QLineEdit(self.decomposer_ModelWidget)
        self.decomposer_API_KeyLE.setObjectName(u"decomposer_API_KeyLE")

        self.horizontalLayout_44.addWidget(self.decomposer_API_KeyLE)

        self.decomposer_API_SaveBtn = QPushButton(self.decomposer_ModelWidget)
        self.decomposer_API_SaveBtn.setObjectName(u"decomposer_API_SaveBtn")

        self.horizontalLayout_44.addWidget(self.decomposer_API_SaveBtn)


        self.verticalLayout_83.addLayout(self.horizontalLayout_44)

        self.decomposer_SystemPromptLabel = QLabel(self.decomposer_ModelWidget)
        self.decomposer_SystemPromptLabel.setObjectName(u"decomposer_SystemPromptLabel")

        self.verticalLayout_83.addWidget(self.decomposer_SystemPromptLabel)

        self.decomposer_SystemPromptTE = QTextEdit(self.decomposer_ModelWidget)
        self.decomposer_SystemPromptTE.setObjectName(u"decomposer_SystemPromptTE")

        self.verticalLayout_83.addWidget(self.decomposer_SystemPromptTE)

        self.decomposer_UserInputTE = QTextEdit(self.decomposer_ModelWidget)
        self.decomposer_UserInputTE.setObjectName(u"decomposer_UserInputTE")
        self.decomposer_UserInputTE.setLineWidth(2)
        self.decomposer_UserInputTE.setMidLineWidth(3)

        self.verticalLayout_83.addWidget(self.decomposer_UserInputTE)

        self.horizontalLayout_46 = QHBoxLayout()
        self.horizontalLayout_46.setObjectName(u"horizontalLayout_46")
        self.decomposer_UpdateBtn = QPushButton(self.decomposer_ModelWidget)
        self.decomposer_UpdateBtn.setObjectName(u"decomposer_UpdateBtn")

        self.horizontalLayout_46.addWidget(self.decomposer_UpdateBtn)

        self.decomposer_cancelBtn = QPushButton(self.decomposer_ModelWidget)
        self.decomposer_cancelBtn.setObjectName(u"decomposer_cancelBtn")

        self.horizontalLayout_46.addWidget(self.decomposer_cancelBtn)

        self.decomposer_SendBtn = QPushButton(self.decomposer_ModelWidget)
        self.decomposer_SendBtn.setObjectName(u"decomposer_SendBtn")

        self.horizontalLayout_46.addWidget(self.decomposer_SendBtn)


        self.verticalLayout_83.addLayout(self.horizontalLayout_46)


        self.horizontalLayout_56.addWidget(self.decomposer_ModelWidget)

        self.decomposer_ControllerGB = QGroupBox(self.page_2)
        self.decomposer_ControllerGB.setObjectName(u"decomposer_ControllerGB")
        self.verticalLayout_87 = QVBoxLayout(self.decomposer_ControllerGB)
        self.verticalLayout_87.setObjectName(u"verticalLayout_87")
        self.inputLLM_ModelLabel = QLabel(self.decomposer_ControllerGB)
        self.inputLLM_ModelLabel.setObjectName(u"inputLLM_ModelLabel")

        self.verticalLayout_87.addWidget(self.inputLLM_ModelLabel)

        self.inputLLM_ModelCB = QComboBox(self.decomposer_ControllerGB)
        self.inputLLM_ModelCB.addItem("")
        self.inputLLM_ModelCB.addItem("")
        self.inputLLM_ModelCB.addItem("")
        self.inputLLM_ModelCB.addItem("")
        self.inputLLM_ModelCB.addItem("")
        self.inputLLM_ModelCB.addItem("")
        self.inputLLM_ModelCB.addItem("")
        self.inputLLM_ModelCB.addItem("")
        self.inputLLM_ModelCB.addItem("")
        self.inputLLM_ModelCB.addItem("")
        self.inputLLM_ModelCB.setObjectName(u"inputLLM_ModelCB")

        self.verticalLayout_87.addWidget(self.inputLLM_ModelCB)

        self.verticalSpacer_4 = QSpacerItem(20, 40, QSizePolicy.Policy.Minimum, QSizePolicy.Policy.Expanding)

        self.verticalLayout_87.addItem(self.verticalSpacer_4)

        self.inputOpenAI_GB = QGroupBox(self.decomposer_ControllerGB)
        self.inputOpenAI_GB.setObjectName(u"inputOpenAI_GB")
        self.verticalLayout_88 = QVBoxLayout(self.inputOpenAI_GB)
        self.verticalLayout_88.setObjectName(u"verticalLayout_88")
        self.inputLLM_TemperatureLabel = QLabel(self.inputOpenAI_GB)
        self.inputLLM_TemperatureLabel.setObjectName(u"inputLLM_TemperatureLabel")

        self.verticalLayout_88.addWidget(self.inputLLM_TemperatureLabel)

        self.inputLLM_TemperatureSB = QDoubleSpinBox(self.inputOpenAI_GB)
        self.inputLLM_TemperatureSB.setObjectName(u"inputLLM_TemperatureSB")
        self.inputLLM_TemperatureSB.setButtonSymbols(QAbstractSpinBox.UpDownArrows)
        self.inputLLM_TemperatureSB.setDecimals(1)
        self.inputLLM_TemperatureSB.setMinimum(0.100000000000000)
        self.inputLLM_TemperatureSB.setMaximum(1.000000000000000)
        self.inputLLM_TemperatureSB.setSingleStep(0.100000000000000)
        self.inputLLM_TemperatureSB.setValue(0.500000000000000)

        self.verticalLayout_88.addWidget(self.inputLLM_TemperatureSB)

        self.inputLLM_PresencePenaltyLabel = QLabel(self.inputOpenAI_GB)
        self.inputLLM_PresencePenaltyLabel.setObjectName(u"inputLLM_PresencePenaltyLabel")

        self.verticalLayout_88.addWidget(self.inputLLM_PresencePenaltyLabel)

        self.inputLLM_PresencePenaltySB = QSpinBox(self.inputOpenAI_GB)
        self.inputLLM_PresencePenaltySB.setObjectName(u"inputLLM_PresencePenaltySB")

        self.verticalLayout_88.addWidget(self.inputLLM_PresencePenaltySB)

        self.inputLLM_FrequencyPenaltyLabel = QLabel(self.inputOpenAI_GB)
        self.inputLLM_FrequencyPenaltyLabel.setObjectName(u"inputLLM_FrequencyPenaltyLabel")

        self.verticalLayout_88.addWidget(self.inputLLM_FrequencyPenaltyLabel)

        self.inputLLM_FrequencyPenalySB = QSpinBox(self.inputOpenAI_GB)
        self.inputLLM_FrequencyPenalySB.setObjectName(u"inputLLM_FrequencyPenalySB")

        self.verticalLayout_88.addWidget(self.inputLLM_FrequencyPenalySB)

        self.inputLLM_TopPLabel = QLabel(self.inputOpenAI_GB)
        self.inputLLM_TopPLabel.setObjectName(u"inputLLM_TopPLabel")

        self.verticalLayout_88.addWidget(self.inputLLM_TopPLabel)

        self.inputLLM_TopPSB = QDoubleSpinBox(self.inputOpenAI_GB)
        self.inputLLM_TopPSB.setObjectName(u"inputLLM_TopPSB")
        self.inputLLM_TopPSB.setDecimals(1)
        self.inputLLM_TopPSB.setMinimum(0.100000000000000)
        self.inputLLM_TopPSB.setMaximum(1.000000000000000)
        self.inputLLM_TopPSB.setSingleStep(0.100000000000000)
        self.inputLLM_TopPSB.setValue(0.500000000000000)

        self.verticalLayout_88.addWidget(self.inputLLM_TopPSB)


        self.verticalLayout_87.addWidget(self.inputOpenAI_GB)

        self.inputLLM_TopKLabel = QLabel(self.decomposer_ControllerGB)
        self.inputLLM_TopKLabel.setObjectName(u"inputLLM_TopKLabel")

        self.verticalLayout_87.addWidget(self.inputLLM_TopKLabel)

        self.inputLLM_TopKSB = QSpinBox(self.decomposer_ControllerGB)
        self.inputLLM_TopKSB.setObjectName(u"inputLLM_TopKSB")
        self.inputLLM_TopKSB.setButtonSymbols(QAbstractSpinBox.UpDownArrows)
        self.inputLLM_TopKSB.setMinimum(20)
        self.inputLLM_TopKSB.setMaximum(100)
        self.inputLLM_TopKSB.setValue(60)

        self.verticalLayout_87.addWidget(self.inputLLM_TopKSB)

        self.inputLLM_MinTokensLabel = QLabel(self.decomposer_ControllerGB)
        self.inputLLM_MinTokensLabel.setObjectName(u"inputLLM_MinTokensLabel")

        self.verticalLayout_87.addWidget(self.inputLLM_MinTokensLabel)

        self.inputLLM_MinTokensLE = QLineEdit(self.decomposer_ControllerGB)
        self.inputLLM_MinTokensLE.setObjectName(u"inputLLM_MinTokensLE")

        self.verticalLayout_87.addWidget(self.inputLLM_MinTokensLE)

        self.inputLLM_MaxTokensLabel = QLabel(self.decomposer_ControllerGB)
        self.inputLLM_MaxTokensLabel.setObjectName(u"inputLLM_MaxTokensLabel")

        self.verticalLayout_87.addWidget(self.inputLLM_MaxTokensLabel)

        self.inputLLM_MaxTokenLE = QLineEdit(self.decomposer_ControllerGB)
        self.inputLLM_MaxTokenLE.setObjectName(u"inputLLM_MaxTokenLE")

        self.verticalLayout_87.addWidget(self.inputLLM_MaxTokenLE)

        self.verticalSpacer_5 = QSpacerItem(20, 40, QSizePolicy.Policy.Minimum, QSizePolicy.Policy.Expanding)

        self.verticalLayout_87.addItem(self.verticalSpacer_5)

        self.decomposer_PingBtn = QPushButton(self.decomposer_ControllerGB)
        self.decomposer_PingBtn.setObjectName(u"decomposer_PingBtn")

        self.verticalLayout_87.addWidget(self.decomposer_PingBtn)


        self.horizontalLayout_56.addWidget(self.decomposer_ControllerGB)

        self.horizontalSpacer_4 = QSpacerItem(40, 20, QSizePolicy.Policy.Expanding, QSizePolicy.Policy.Minimum)

        self.horizontalLayout_56.addItem(self.horizontalSpacer_4)

        self.LLMstackedWidget.addWidget(self.page_2)
        self.page_3 = QWidget()
        self.page_3.setObjectName(u"page_3")
        self.horizontalLayout_58 = QHBoxLayout(self.page_3)
        self.horizontalLayout_58.setObjectName(u"horizontalLayout_58")
        self.frame_2 = QFrame(self.page_3)
        self.frame_2.setObjectName(u"frame_2")
        self.frame_2.setFrameShape(QFrame.NoFrame)
        self.verticalLayout_84 = QVBoxLayout(self.frame_2)
        self.verticalLayout_84.setObjectName(u"verticalLayout_84")
        self.horizontalLayout_51 = QHBoxLayout()
        self.horizontalLayout_51.setObjectName(u"horizontalLayout_51")
        self.middleAgent_NameLabel = QLabel(self.frame_2)
        self.middleAgent_NameLabel.setObjectName(u"middleAgent_NameLabel")

        self.horizontalLayout_51.addWidget(self.middleAgent_NameLabel)

        self.middleAgent_AgentNameLE = QLineEdit(self.frame_2)
        self.middleAgent_AgentNameLE.setObjectName(u"middleAgent_AgentNameLE")

        self.horizontalLayout_51.addWidget(self.middleAgent_AgentNameLE)


        self.verticalLayout_84.addLayout(self.horizontalLayout_51)

        self.horizontalLayout_52 = QHBoxLayout()
        self.horizontalLayout_52.setObjectName(u"horizontalLayout_52")
        self.middleAgent_AgentID_Label = QLabel(self.frame_2)
        self.middleAgent_AgentID_Label.setObjectName(u"middleAgent_AgentID_Label")

        self.horizontalLayout_52.addWidget(self.middleAgent_AgentID_Label)

        self.middleAgent_AgentID_LE = QLineEdit(self.frame_2)
        self.middleAgent_AgentID_LE.setObjectName(u"middleAgent_AgentID_LE")

        self.horizontalLayout_52.addWidget(self.middleAgent_AgentID_LE)


        self.verticalLayout_84.addLayout(self.horizontalLayout_52)

        self.horizontalLayout_53 = QHBoxLayout()
        self.horizontalLayout_53.setObjectName(u"horizontalLayout_53")
        self.middleAgent_API_KeyLabel = QLabel(self.frame_2)
        self.middleAgent_API_KeyLabel.setObjectName(u"middleAgent_API_KeyLabel")

        self.horizontalLayout_53.addWidget(self.middleAgent_API_KeyLabel)

        self.middleAgent_API_KeyLE = QLineEdit(self.frame_2)
        self.middleAgent_API_KeyLE.setObjectName(u"middleAgent_API_KeyLE")

        self.horizontalLayout_53.addWidget(self.middleAgent_API_KeyLE)

        self.middleAgentAPI_SaveBtn = QPushButton(self.frame_2)
        self.middleAgentAPI_SaveBtn.setObjectName(u"middleAgentAPI_SaveBtn")

        self.horizontalLayout_53.addWidget(self.middleAgentAPI_SaveBtn)


        self.verticalLayout_84.addLayout(self.horizontalLayout_53)

        self.middleAgent_PromptLabel = QLabel(self.frame_2)
        self.middleAgent_PromptLabel.setObjectName(u"middleAgent_PromptLabel")

        self.verticalLayout_84.addWidget(self.middleAgent_PromptLabel)

        self.middleAgent_SystemPromptTE = QTextEdit(self.frame_2)
        self.middleAgent_SystemPromptTE.setObjectName(u"middleAgent_SystemPromptTE")

        self.verticalLayout_84.addWidget(self.middleAgent_SystemPromptTE)

        self.middleAgent_TextEdit = QTextEdit(self.frame_2)
        self.middleAgent_TextEdit.setObjectName(u"middleAgent_TextEdit")

        self.verticalLayout_84.addWidget(self.middleAgent_TextEdit)

        self.horizontalLayout_54 = QHBoxLayout()
        self.horizontalLayout_54.setObjectName(u"horizontalLayout_54")
        self.middleAgent_updateBtn = QPushButton(self.frame_2)
        self.middleAgent_updateBtn.setObjectName(u"middleAgent_updateBtn")

        self.horizontalLayout_54.addWidget(self.middleAgent_updateBtn)

        self.middleAgent_cancelBtn = QPushButton(self.frame_2)
        self.middleAgent_cancelBtn.setObjectName(u"middleAgent_cancelBtn")

        self.horizontalLayout_54.addWidget(self.middleAgent_cancelBtn)

        self.middleAgent_SendBtn = QPushButton(self.frame_2)
        self.middleAgent_SendBtn.setObjectName(u"middleAgent_SendBtn")

        self.horizontalLayout_54.addWidget(self.middleAgent_SendBtn)


        self.verticalLayout_84.addLayout(self.horizontalLayout_54)


        self.horizontalLayout_58.addWidget(self.frame_2)

        self.middleAgent_ControllerGB = QGroupBox(self.page_3)
        self.middleAgent_ControllerGB.setObjectName(u"middleAgent_ControllerGB")
        self.verticalLayout_94 = QVBoxLayout(self.middleAgent_ControllerGB)
        self.verticalLayout_94.setObjectName(u"verticalLayout_94")
        self.middleAgent_ModelLabel = QLabel(self.middleAgent_ControllerGB)
        self.middleAgent_ModelLabel.setObjectName(u"middleAgent_ModelLabel")

        self.verticalLayout_94.addWidget(self.middleAgent_ModelLabel)

        self.middleAgent_ModelCB = QComboBox(self.middleAgent_ControllerGB)
        self.middleAgent_ModelCB.addItem("")
        self.middleAgent_ModelCB.addItem("")
        self.middleAgent_ModelCB.addItem("")
        self.middleAgent_ModelCB.addItem("")
        self.middleAgent_ModelCB.addItem("")
        self.middleAgent_ModelCB.addItem("")
        self.middleAgent_ModelCB.addItem("")
        self.middleAgent_ModelCB.addItem("")
        self.middleAgent_ModelCB.addItem("")
        self.middleAgent_ModelCB.addItem("")
        self.middleAgent_ModelCB.setObjectName(u"middleAgent_ModelCB")

        self.verticalLayout_94.addWidget(self.middleAgent_ModelCB)

        self.verticalSpacer_17 = QSpacerItem(20, 40, QSizePolicy.Policy.Minimum, QSizePolicy.Policy.Expanding)

        self.verticalLayout_94.addItem(self.verticalSpacer_17)

        self.inputOpenAI_GB_3 = QGroupBox(self.middleAgent_ControllerGB)
        self.inputOpenAI_GB_3.setObjectName(u"inputOpenAI_GB_3")
        self.verticalLayout_95 = QVBoxLayout(self.inputOpenAI_GB_3)
        self.verticalLayout_95.setObjectName(u"verticalLayout_95")
        self.temperatureLabel_3 = QLabel(self.inputOpenAI_GB_3)
        self.temperatureLabel_3.setObjectName(u"temperatureLabel_3")

        self.verticalLayout_95.addWidget(self.temperatureLabel_3)

        self.middleAgent_TemperatureSB = QDoubleSpinBox(self.inputOpenAI_GB_3)
        self.middleAgent_TemperatureSB.setObjectName(u"middleAgent_TemperatureSB")
        self.middleAgent_TemperatureSB.setButtonSymbols(QAbstractSpinBox.UpDownArrows)
        self.middleAgent_TemperatureSB.setDecimals(1)
        self.middleAgent_TemperatureSB.setMinimum(0.100000000000000)
        self.middleAgent_TemperatureSB.setMaximum(1.000000000000000)
        self.middleAgent_TemperatureSB.setSingleStep(0.100000000000000)
        self.middleAgent_TemperatureSB.setValue(0.500000000000000)

        self.verticalLayout_95.addWidget(self.middleAgent_TemperatureSB)

        self.middleAgent_TemperatureLabel = QLabel(self.inputOpenAI_GB_3)
        self.middleAgent_TemperatureLabel.setObjectName(u"middleAgent_TemperatureLabel")

        self.verticalLayout_95.addWidget(self.middleAgent_TemperatureLabel)

        self.middleAgent_PresencePenaltySB = QSpinBox(self.inputOpenAI_GB_3)
        self.middleAgent_PresencePenaltySB.setObjectName(u"middleAgent_PresencePenaltySB")

        self.verticalLayout_95.addWidget(self.middleAgent_PresencePenaltySB)

        self.middleAgent_FrequencyPenaltyLabel = QLabel(self.inputOpenAI_GB_3)
        self.middleAgent_FrequencyPenaltyLabel.setObjectName(u"middleAgent_FrequencyPenaltyLabel")

        self.verticalLayout_95.addWidget(self.middleAgent_FrequencyPenaltyLabel)

        self.middleAgent_FrequencyPenalySB = QSpinBox(self.inputOpenAI_GB_3)
        self.middleAgent_FrequencyPenalySB.setObjectName(u"middleAgent_FrequencyPenalySB")

        self.verticalLayout_95.addWidget(self.middleAgent_FrequencyPenalySB)

        self.middleAgent_TopPLabel = QLabel(self.inputOpenAI_GB_3)
        self.middleAgent_TopPLabel.setObjectName(u"middleAgent_TopPLabel")

        self.verticalLayout_95.addWidget(self.middleAgent_TopPLabel)

        self.middleAgent_TopPSB = QDoubleSpinBox(self.inputOpenAI_GB_3)
        self.middleAgent_TopPSB.setObjectName(u"middleAgent_TopPSB")
        self.middleAgent_TopPSB.setDecimals(1)
        self.middleAgent_TopPSB.setMinimum(0.100000000000000)
        self.middleAgent_TopPSB.setMaximum(1.000000000000000)
        self.middleAgent_TopPSB.setSingleStep(0.100000000000000)
        self.middleAgent_TopPSB.setValue(0.500000000000000)

        self.verticalLayout_95.addWidget(self.middleAgent_TopPSB)


        self.verticalLayout_94.addWidget(self.inputOpenAI_GB_3)

        self.middleAgent_TopKLabel = QLabel(self.middleAgent_ControllerGB)
        self.middleAgent_TopKLabel.setObjectName(u"middleAgent_TopKLabel")

        self.verticalLayout_94.addWidget(self.middleAgent_TopKLabel)

        self.middleAgent_TopKSB = QSpinBox(self.middleAgent_ControllerGB)
        self.middleAgent_TopKSB.setObjectName(u"middleAgent_TopKSB")
        self.middleAgent_TopKSB.setButtonSymbols(QAbstractSpinBox.UpDownArrows)
        self.middleAgent_TopKSB.setMinimum(20)
        self.middleAgent_TopKSB.setMaximum(100)
        self.middleAgent_TopKSB.setValue(60)

        self.verticalLayout_94.addWidget(self.middleAgent_TopKSB)

        self.middleAgent_MinTokensLabel = QLabel(self.middleAgent_ControllerGB)
        self.middleAgent_MinTokensLabel.setObjectName(u"middleAgent_MinTokensLabel")

        self.verticalLayout_94.addWidget(self.middleAgent_MinTokensLabel)

        self.middleAgent_MinTokensLE = QLineEdit(self.middleAgent_ControllerGB)
        self.middleAgent_MinTokensLE.setObjectName(u"middleAgent_MinTokensLE")

        self.verticalLayout_94.addWidget(self.middleAgent_MinTokensLE)

        self.middleAgent_MaxTokensLabel = QLabel(self.middleAgent_ControllerGB)
        self.middleAgent_MaxTokensLabel.setObjectName(u"middleAgent_MaxTokensLabel")

        self.verticalLayout_94.addWidget(self.middleAgent_MaxTokensLabel)

        self.middleAgent_MaxTokenLE = QLineEdit(self.middleAgent_ControllerGB)
        self.middleAgent_MaxTokenLE.setObjectName(u"middleAgent_MaxTokenLE")

        self.verticalLayout_94.addWidget(self.middleAgent_MaxTokenLE)

        self.verticalSpacer_18 = QSpacerItem(20, 40, QSizePolicy.Policy.Minimum, QSizePolicy.Policy.Expanding)

        self.verticalLayout_94.addItem(self.verticalSpacer_18)

        self.middleAgent_PingBtn = QPushButton(self.middleAgent_ControllerGB)
        self.middleAgent_PingBtn.setObjectName(u"middleAgent_PingBtn")

        self.verticalLayout_94.addWidget(self.middleAgent_PingBtn)


        self.horizontalLayout_58.addWidget(self.middleAgent_ControllerGB)

        self.horizontalSpacer_8 = QSpacerItem(40, 20, QSizePolicy.Policy.Expanding, QSizePolicy.Policy.Minimum)

        self.horizontalLayout_58.addItem(self.horizontalSpacer_8)

        self.LLMstackedWidget.addWidget(self.page_3)
        self.page_4 = QWidget()
        self.page_4.setObjectName(u"page_4")
        self.horizontalLayout_57 = QHBoxLayout(self.page_4)
        self.horizontalLayout_57.setObjectName(u"horizontalLayout_57")
        self.frame = QFrame(self.page_4)
        self.frame.setObjectName(u"frame")
        self.frame.setFrameShape(QFrame.NoFrame)
        self.verticalLayout_85 = QVBoxLayout(self.frame)
        self.verticalLayout_85.setObjectName(u"verticalLayout_85")
        self.horizontalLayout_48 = QHBoxLayout()
        self.horizontalLayout_48.setObjectName(u"horizontalLayout_48")
        self.conductor_NameLabel = QLabel(self.frame)
        self.conductor_NameLabel.setObjectName(u"conductor_NameLabel")

        self.horizontalLayout_48.addWidget(self.conductor_NameLabel)

        self.conductor_AgentNameLE = QLineEdit(self.frame)
        self.conductor_AgentNameLE.setObjectName(u"conductor_AgentNameLE")

        self.horizontalLayout_48.addWidget(self.conductor_AgentNameLE)


        self.verticalLayout_85.addLayout(self.horizontalLayout_48)

        self.horizontalLayout_49 = QHBoxLayout()
        self.horizontalLayout_49.setObjectName(u"horizontalLayout_49")
        self.conductor_AgentID_Label = QLabel(self.frame)
        self.conductor_AgentID_Label.setObjectName(u"conductor_AgentID_Label")

        self.horizontalLayout_49.addWidget(self.conductor_AgentID_Label)

        self.conductor_AgentID_LE = QLineEdit(self.frame)
        self.conductor_AgentID_LE.setObjectName(u"conductor_AgentID_LE")

        self.horizontalLayout_49.addWidget(self.conductor_AgentID_LE)


        self.verticalLayout_85.addLayout(self.horizontalLayout_49)

        self.horizontalLayout_50 = QHBoxLayout()
        self.horizontalLayout_50.setObjectName(u"horizontalLayout_50")
        self.conductor_API_KeyLabel = QLabel(self.frame)
        self.conductor_API_KeyLabel.setObjectName(u"conductor_API_KeyLabel")

        self.horizontalLayout_50.addWidget(self.conductor_API_KeyLabel)

        self.conductor_API_KeyLE = QLineEdit(self.frame)
        self.conductor_API_KeyLE.setObjectName(u"conductor_API_KeyLE")

        self.horizontalLayout_50.addWidget(self.conductor_API_KeyLE)

        self.conductorAPI_SaveBtn = QPushButton(self.frame)
        self.conductorAPI_SaveBtn.setObjectName(u"conductorAPI_SaveBtn")

        self.horizontalLayout_50.addWidget(self.conductorAPI_SaveBtn)


        self.verticalLayout_85.addLayout(self.horizontalLayout_50)

        self.conductor_RoleLAbel = QLabel(self.frame)
        self.conductor_RoleLAbel.setObjectName(u"conductor_RoleLAbel")

        self.verticalLayout_85.addWidget(self.conductor_RoleLAbel)

        self.conductor_RoleTE = QTextEdit(self.frame)
        self.conductor_RoleTE.setObjectName(u"conductor_RoleTE")

        self.verticalLayout_85.addWidget(self.conductor_RoleTE)

        self.conductor_SystemPromptLabel = QLabel(self.frame)
        self.conductor_SystemPromptLabel.setObjectName(u"conductor_SystemPromptLabel")

        self.verticalLayout_85.addWidget(self.conductor_SystemPromptLabel)

        self.conductor_SystemPromptTE = QTextEdit(self.frame)
        self.conductor_SystemPromptTE.setObjectName(u"conductor_SystemPromptTE")

        self.verticalLayout_85.addWidget(self.conductor_SystemPromptTE)

        self.horizontalLayout_61 = QHBoxLayout()
        self.horizontalLayout_61.setObjectName(u"horizontalLayout_61")
        self.conductor_UpdateBtn = QPushButton(self.frame)
        self.conductor_UpdateBtn.setObjectName(u"conductor_UpdateBtn")

        self.horizontalLayout_61.addWidget(self.conductor_UpdateBtn)

        self.conductor_CancelBtn = QPushButton(self.frame)
        self.conductor_CancelBtn.setObjectName(u"conductor_CancelBtn")

        self.horizontalLayout_61.addWidget(self.conductor_CancelBtn)

        self.conductor_SendBtn = QPushButton(self.frame)
        self.conductor_SendBtn.setObjectName(u"conductor_SendBtn")

        self.horizontalLayout_61.addWidget(self.conductor_SendBtn)


        self.verticalLayout_85.addLayout(self.horizontalLayout_61)


        self.horizontalLayout_57.addWidget(self.frame)

        self.conductor_ControllerGB = QGroupBox(self.page_4)
        self.conductor_ControllerGB.setObjectName(u"conductor_ControllerGB")
        self.verticalLayout_90 = QVBoxLayout(self.conductor_ControllerGB)
        self.verticalLayout_90.setObjectName(u"verticalLayout_90")
        self.conductor_ModelLabel = QLabel(self.conductor_ControllerGB)
        self.conductor_ModelLabel.setObjectName(u"conductor_ModelLabel")

        self.verticalLayout_90.addWidget(self.conductor_ModelLabel)

        self.conductor_ModelCB = QComboBox(self.conductor_ControllerGB)
        self.conductor_ModelCB.addItem("")
        self.conductor_ModelCB.addItem("")
        self.conductor_ModelCB.addItem("")
        self.conductor_ModelCB.addItem("")
        self.conductor_ModelCB.addItem("")
        self.conductor_ModelCB.addItem("")
        self.conductor_ModelCB.addItem("")
        self.conductor_ModelCB.addItem("")
        self.conductor_ModelCB.addItem("")
        self.conductor_ModelCB.addItem("")
        self.conductor_ModelCB.setObjectName(u"conductor_ModelCB")

        self.verticalLayout_90.addWidget(self.conductor_ModelCB)

        self.verticalSpacer_8 = QSpacerItem(20, 40, QSizePolicy.Policy.Minimum, QSizePolicy.Policy.Expanding)

        self.verticalLayout_90.addItem(self.verticalSpacer_8)

        self.conductor_OpenAI_GB = QGroupBox(self.conductor_ControllerGB)
        self.conductor_OpenAI_GB.setObjectName(u"conductor_OpenAI_GB")
        self.verticalLayout_91 = QVBoxLayout(self.conductor_OpenAI_GB)
        self.verticalLayout_91.setObjectName(u"verticalLayout_91")
        self.conductor_TemperatureLabel = QLabel(self.conductor_OpenAI_GB)
        self.conductor_TemperatureLabel.setObjectName(u"conductor_TemperatureLabel")

        self.verticalLayout_91.addWidget(self.conductor_TemperatureLabel)

        self.conductor_TemperatureSB = QSpinBox(self.conductor_OpenAI_GB)
        self.conductor_TemperatureSB.setObjectName(u"conductor_TemperatureSB")

        self.verticalLayout_91.addWidget(self.conductor_TemperatureSB)

        self.conductor_PresencePenaltyLabel = QLabel(self.conductor_OpenAI_GB)
        self.conductor_PresencePenaltyLabel.setObjectName(u"conductor_PresencePenaltyLabel")

        self.verticalLayout_91.addWidget(self.conductor_PresencePenaltyLabel)

        self.conductor_PresencePenaltySB = QSpinBox(self.conductor_OpenAI_GB)
        self.conductor_PresencePenaltySB.setObjectName(u"conductor_PresencePenaltySB")

        self.verticalLayout_91.addWidget(self.conductor_PresencePenaltySB)

        self.conductor_FrequencPenaltyLabel = QLabel(self.conductor_OpenAI_GB)
        self.conductor_FrequencPenaltyLabel.setObjectName(u"conductor_FrequencPenaltyLabel")

        self.verticalLayout_91.addWidget(self.conductor_FrequencPenaltyLabel)

        self.conductor_FrequencyPenaltySB = QSpinBox(self.conductor_OpenAI_GB)
        self.conductor_FrequencyPenaltySB.setObjectName(u"conductor_FrequencyPenaltySB")

        self.verticalLayout_91.addWidget(self.conductor_FrequencyPenaltySB)

        self.conductor_TopPLabel = QLabel(self.conductor_OpenAI_GB)
        self.conductor_TopPLabel.setObjectName(u"conductor_TopPLabel")

        self.verticalLayout_91.addWidget(self.conductor_TopPLabel)

        self.conductor_TopPSB = QDoubleSpinBox(self.conductor_OpenAI_GB)
        self.conductor_TopPSB.setObjectName(u"conductor_TopPSB")
        self.conductor_TopPSB.setDecimals(1)
        self.conductor_TopPSB.setMinimum(0.100000000000000)
        self.conductor_TopPSB.setMaximum(1.000000000000000)
        self.conductor_TopPSB.setSingleStep(0.100000000000000)
        self.conductor_TopPSB.setValue(0.500000000000000)

        self.verticalLayout_91.addWidget(self.conductor_TopPSB)


        self.verticalLayout_90.addWidget(self.conductor_OpenAI_GB)

        self.conductor_TopKLabel = QLabel(self.conductor_ControllerGB)
        self.conductor_TopKLabel.setObjectName(u"conductor_TopKLabel")

        self.verticalLayout_90.addWidget(self.conductor_TopKLabel)

        self.conductor_TopKSB = QSpinBox(self.conductor_ControllerGB)
        self.conductor_TopKSB.setObjectName(u"conductor_TopKSB")
        self.conductor_TopKSB.setMinimum(20)
        self.conductor_TopKSB.setMaximum(100)
        self.conductor_TopKSB.setValue(60)

        self.verticalLayout_90.addWidget(self.conductor_TopKSB)

        self.conductor_MinTokensLabel = QLabel(self.conductor_ControllerGB)
        self.conductor_MinTokensLabel.setObjectName(u"conductor_MinTokensLabel")

        self.verticalLayout_90.addWidget(self.conductor_MinTokensLabel)

        self.conductor_MinTkensLE = QLineEdit(self.conductor_ControllerGB)
        self.conductor_MinTkensLE.setObjectName(u"conductor_MinTkensLE")

        self.verticalLayout_90.addWidget(self.conductor_MinTkensLE)

        self.conductor_MaxTokensLabel = QLabel(self.conductor_ControllerGB)
        self.conductor_MaxTokensLabel.setObjectName(u"conductor_MaxTokensLabel")

        self.verticalLayout_90.addWidget(self.conductor_MaxTokensLabel)

        self.conductor_MaxTokenLE = QLineEdit(self.conductor_ControllerGB)
        self.conductor_MaxTokenLE.setObjectName(u"conductor_MaxTokenLE")

        self.verticalLayout_90.addWidget(self.conductor_MaxTokenLE)

        self.verticalSpacer_9 = QSpacerItem(20, 40, QSizePolicy.Policy.Minimum, QSizePolicy.Policy.Expanding)

        self.verticalLayout_90.addItem(self.verticalSpacer_9)

        self.conductor_PingBtn = QPushButton(self.conductor_ControllerGB)
        self.conductor_PingBtn.setObjectName(u"conductor_PingBtn")

        self.verticalLayout_90.addWidget(self.conductor_PingBtn)


        self.horizontalLayout_57.addWidget(self.conductor_ControllerGB)

        self.horizontalSpacer_11 = QSpacerItem(40, 20, QSizePolicy.Policy.Expanding, QSizePolicy.Policy.Minimum)

        self.horizontalLayout_57.addItem(self.horizontalSpacer_11)

        self.LLMstackedWidget.addWidget(self.page_4)

        self.verticalLayout_11.addWidget(self.LLMstackedWidget)

        self.verticalSpacer = QSpacerItem(20, 40, QSizePolicy.Policy.Minimum, QSizePolicy.Policy.Expanding)

        self.verticalLayout_11.addItem(self.verticalSpacer)

        self.mainStackedWidget.addWidget(self.LLM_ConfigPage)
        self.template_EditorPage = QWidget()
        self.template_EditorPage.setObjectName(u"template_EditorPage")
        self.template_EditorPage.setStyleSheet(u"QWidget {\n"
"    background-color: transparent\n"
"}\n"
"/* All widgets inside Template Editor base */\n"
"QWidget#scrollAreaWidgetContents {\n"
"    background-color: transparent;\n"
"}\n"
"\n"
"\n"
"QScrollBar:vertical {\n"
"    background: rgba(0, 0, 0, 100);  /* subtle dark rail */\n"
"    border: 1px solid #89f7fe;\n"
"    width: 12px;\n"
"    margin: 0px;\n"
"}\n"
"\n"
"QScrollBar::handle:vertical {\n"
"    background: #89f7fe;             /* electric blue thumb */\n"
"    border-radius: 4px;\n"
"    min-height: 20px;\n"
"}\n"
"\n"
"QScrollBar:horizontal {\n"
"    background: rgba(0, 0, 0, 175);  /* subtle dark rail */\n"
"    border: 1px solid #89f7fe;\n"
"    height: 12px;\n"
"    margin: 0px;\n"
"}\n"
"\n"
"QScrollBar::handle:horizontal {\n"
"    background: #89f7fe;             /* electric blue thumb */\n"
"    border-radius: 4px;\n"
"    min-width: 20px;\n"
"}\n"
"QLineEdit, QTextEdit, QPlainTextEdit {\n"
"    background: rgba(20, 20, 30, 100); /* semi-transparent black */\n"
"    color: #00f7ff;\n"
""
                        "    border: 2px solid qlineargradient(\n"
"        spread:pad, x1:0, y1:0, x2:1, y2:1,\n"
"        stop:0 #00fff7, stop:0.5 #00ff94, stop:1 #00baff\n"
"    );\n"
"    border-radius: 6px;\n"
"    padding: 6px;\n"
"    font-size: 14px;\n"
"}\n"
"\n"
"QLineEdit:focus, QTextEdit:focus, QPlainTextEdit:focus {\n"
"    border: 2px solid qlineargradient(\n"
"        spread:pad, x1:1, y1:0, x2:0, y2:1,\n"
"        stop:0 #00c3ff, stop:1 #00ffa3\n"
"    );\n"
"    outline: none;\n"
"}\n"
"QLabel {\n"
"    border: none;\n"
"} ")
        self.verticalLayout_33 = QVBoxLayout(self.template_EditorPage)
        self.verticalLayout_33.setObjectName(u"verticalLayout_33")
        self.scrollArea = QScrollArea(self.template_EditorPage)
        self.scrollArea.setObjectName(u"scrollArea")
        self.scrollArea.setVerticalScrollBarPolicy(Qt.ScrollBarAsNeeded)
        self.scrollArea.setHorizontalScrollBarPolicy(Qt.ScrollBarAsNeeded)
        self.scrollArea.setSizeAdjustPolicy(QAbstractScrollArea.AdjustIgnored)
        self.scrollArea.setWidgetResizable(True)
        self.scrollAreaWidgetContents = QWidget()
        self.scrollAreaWidgetContents.setObjectName(u"scrollAreaWidgetContents")
        self.scrollAreaWidgetContents.setGeometry(QRect(-1681, -522, 3450, 1500))
        sizePolicy3 = QSizePolicy(QSizePolicy.Policy.Minimum, QSizePolicy.Policy.Minimum)
        sizePolicy3.setHorizontalStretch(0)
        sizePolicy3.setVerticalStretch(0)
        sizePolicy3.setHeightForWidth(self.scrollAreaWidgetContents.sizePolicy().hasHeightForWidth())
        self.scrollAreaWidgetContents.setSizePolicy(sizePolicy3)
        self.scrollAreaWidgetContents.setMinimumSize(QSize(3450, 1500))
        self.bgLabel = QLabel(self.scrollAreaWidgetContents)
        self.bgLabel.setObjectName(u"bgLabel")
        self.bgLabel.setGeometry(QRect(115, 310, 3300, 1200))
        sizePolicy4 = QSizePolicy(QSizePolicy.Policy.Fixed, QSizePolicy.Policy.Fixed)
        sizePolicy4.setHorizontalStretch(0)
        sizePolicy4.setVerticalStretch(0)
        sizePolicy4.setHeightForWidth(self.bgLabel.sizePolicy().hasHeightForWidth())
        self.bgLabel.setSizePolicy(sizePolicy4)
        self.bgLabel.setPixmap(QPixmap(u"bg.png"))
        self.bgLabel.setScaledContents(True)
        self.inputPhaseWidget = QWidget(self.scrollAreaWidgetContents)
        self.inputPhaseWidget.setObjectName(u"inputPhaseWidget")
        self.inputPhaseWidget.setGeometry(QRect(890, 480, 566, 881))
        self.inputPhase_InputPillarWidget = QWidget(self.inputPhaseWidget)
        self.inputPhase_InputPillarWidget.setObjectName(u"inputPhase_InputPillarWidget")
        self.inputPhase_InputPillarWidget.setGeometry(QRect(0, 275, 150, 600))
        sizePolicy4.setHeightForWidth(self.inputPhase_InputPillarWidget.sizePolicy().hasHeightForWidth())
        self.inputPhase_InputPillarWidget.setSizePolicy(sizePolicy4)
        self.inputPhase_InputPillarModLE = QLineEdit(self.inputPhase_InputPillarWidget)
        self.inputPhase_InputPillarModLE.setObjectName(u"inputPhase_InputPillarModLE")
        self.inputPhase_InputPillarModLE.setGeometry(QRect(20, 30, 113, 27))
        self.inputPhase_InputPillarEle_1 = QLineEdit(self.inputPhase_InputPillarWidget)
        self.inputPhase_InputPillarEle_1.setObjectName(u"inputPhase_InputPillarEle_1")
        self.inputPhase_InputPillarEle_1.setGeometry(QRect(20, 120, 113, 27))
        self.inputPhase_InputPillarEle_2 = QLineEdit(self.inputPhase_InputPillarWidget)
        self.inputPhase_InputPillarEle_2.setObjectName(u"inputPhase_InputPillarEle_2")
        self.inputPhase_InputPillarEle_2.setGeometry(QRect(20, 190, 113, 27))
        self.inputPhase_InputPillarEle_3 = QLineEdit(self.inputPhase_InputPillarWidget)
        self.inputPhase_InputPillarEle_3.setObjectName(u"inputPhase_InputPillarEle_3")
        self.inputPhase_InputPillarEle_3.setGeometry(QRect(20, 260, 113, 27))
        self.inputPhase_InputPillarEle_4 = QLineEdit(self.inputPhase_InputPillarWidget)
        self.inputPhase_InputPillarEle_4.setObjectName(u"inputPhase_InputPillarEle_4")
        self.inputPhase_InputPillarEle_4.setGeometry(QRect(20, 335, 113, 27))
        self.inputPhase_InputPillarEle_5 = QLineEdit(self.inputPhase_InputPillarWidget)
        self.inputPhase_InputPillarEle_5.setObjectName(u"inputPhase_InputPillarEle_5")
        self.inputPhase_InputPillarEle_5.setGeometry(QRect(20, 405, 113, 27))
        self.inputPhase_InputPillarEle_6 = QLineEdit(self.inputPhase_InputPillarWidget)
        self.inputPhase_InputPillarEle_6.setObjectName(u"inputPhase_InputPillarEle_6")
        self.inputPhase_InputPillarEle_6.setGeometry(QRect(20, 475, 113, 27))
        self.inputPhase_InputPillarEle_7 = QLineEdit(self.inputPhase_InputPillarWidget)
        self.inputPhase_InputPillarEle_7.setObjectName(u"inputPhase_InputPillarEle_7")
        self.inputPhase_InputPillarEle_7.setGeometry(QRect(20, 545, 113, 27))
        self.inputPhase_IdentityPillarWidget = QWidget(self.inputPhaseWidget)
        self.inputPhase_IdentityPillarWidget.setObjectName(u"inputPhase_IdentityPillarWidget")
        self.inputPhase_IdentityPillarWidget.setGeometry(QRect(200, 275, 150, 600))
        sizePolicy4.setHeightForWidth(self.inputPhase_IdentityPillarWidget.sizePolicy().hasHeightForWidth())
        self.inputPhase_IdentityPillarWidget.setSizePolicy(sizePolicy4)
        self.inputPhase_IdentityPillarModLE = QLineEdit(self.inputPhase_IdentityPillarWidget)
        self.inputPhase_IdentityPillarModLE.setObjectName(u"inputPhase_IdentityPillarModLE")
        self.inputPhase_IdentityPillarModLE.setGeometry(QRect(20, 30, 113, 27))
        self.inputPhase_IdentityPillarEle_1 = QLineEdit(self.inputPhase_IdentityPillarWidget)
        self.inputPhase_IdentityPillarEle_1.setObjectName(u"inputPhase_IdentityPillarEle_1")
        self.inputPhase_IdentityPillarEle_1.setGeometry(QRect(25, 120, 113, 27))
        self.inputPhase_IdentityPillarEle_2 = QLineEdit(self.inputPhase_IdentityPillarWidget)
        self.inputPhase_IdentityPillarEle_2.setObjectName(u"inputPhase_IdentityPillarEle_2")
        self.inputPhase_IdentityPillarEle_2.setGeometry(QRect(25, 190, 113, 27))
        self.inputPhase_IdentityPillarEle_3 = QLineEdit(self.inputPhase_IdentityPillarWidget)
        self.inputPhase_IdentityPillarEle_3.setObjectName(u"inputPhase_IdentityPillarEle_3")
        self.inputPhase_IdentityPillarEle_3.setGeometry(QRect(25, 260, 113, 27))
        self.inputPhase_IdentityPillarEle_4 = QLineEdit(self.inputPhase_IdentityPillarWidget)
        self.inputPhase_IdentityPillarEle_4.setObjectName(u"inputPhase_IdentityPillarEle_4")
        self.inputPhase_IdentityPillarEle_4.setGeometry(QRect(25, 335, 113, 27))
        self.inputPhase_IdentityPillarEle_5 = QLineEdit(self.inputPhase_IdentityPillarWidget)
        self.inputPhase_IdentityPillarEle_5.setObjectName(u"inputPhase_IdentityPillarEle_5")
        self.inputPhase_IdentityPillarEle_5.setGeometry(QRect(25, 405, 113, 27))
        self.inputPhase_IdentityPillarEle_6 = QLineEdit(self.inputPhase_IdentityPillarWidget)
        self.inputPhase_IdentityPillarEle_6.setObjectName(u"inputPhase_IdentityPillarEle_6")
        self.inputPhase_IdentityPillarEle_6.setGeometry(QRect(25, 475, 113, 27))
        self.inputPhase_IdentityPillarEle_7 = QLineEdit(self.inputPhase_IdentityPillarWidget)
        self.inputPhase_IdentityPillarEle_7.setObjectName(u"inputPhase_IdentityPillarEle_7")
        self.inputPhase_IdentityPillarEle_7.setGeometry(QRect(25, 545, 113, 27))
        self.inputPhase_InceptionPillarWidget = QWidget(self.inputPhaseWidget)
        self.inputPhase_InceptionPillarWidget.setObjectName(u"inputPhase_InceptionPillarWidget")
        self.inputPhase_InceptionPillarWidget.setGeometry(QRect(400, 275, 150, 600))
        sizePolicy4.setHeightForWidth(self.inputPhase_InceptionPillarWidget.sizePolicy().hasHeightForWidth())
        self.inputPhase_InceptionPillarWidget.setSizePolicy(sizePolicy4)
        self.inputPhase_InceptionPillarModLE = QLineEdit(self.inputPhase_InceptionPillarWidget)
        self.inputPhase_InceptionPillarModLE.setObjectName(u"inputPhase_InceptionPillarModLE")
        self.inputPhase_InceptionPillarModLE.setGeometry(QRect(25, 30, 113, 27))
        self.inputPhase_InceptionPillarEle_1 = QLineEdit(self.inputPhase_InceptionPillarWidget)
        self.inputPhase_InceptionPillarEle_1.setObjectName(u"inputPhase_InceptionPillarEle_1")
        self.inputPhase_InceptionPillarEle_1.setGeometry(QRect(30, 120, 113, 27))
        self.inputPhase_InceptionPillarEle_2 = QLineEdit(self.inputPhase_InceptionPillarWidget)
        self.inputPhase_InceptionPillarEle_2.setObjectName(u"inputPhase_InceptionPillarEle_2")
        self.inputPhase_InceptionPillarEle_2.setGeometry(QRect(30, 190, 113, 27))
        self.inputPhase_InceptionPillarEle_3 = QLineEdit(self.inputPhase_InceptionPillarWidget)
        self.inputPhase_InceptionPillarEle_3.setObjectName(u"inputPhase_InceptionPillarEle_3")
        self.inputPhase_InceptionPillarEle_3.setGeometry(QRect(25, 260, 113, 27))
        self.inputPhase_InceptionPillarEle_4 = QLineEdit(self.inputPhase_InceptionPillarWidget)
        self.inputPhase_InceptionPillarEle_4.setObjectName(u"inputPhase_InceptionPillarEle_4")
        self.inputPhase_InceptionPillarEle_4.setGeometry(QRect(30, 335, 113, 27))
        self.inputPhase_InceptionPillarEle_5 = QLineEdit(self.inputPhase_InceptionPillarWidget)
        self.inputPhase_InceptionPillarEle_5.setObjectName(u"inputPhase_InceptionPillarEle_5")
        self.inputPhase_InceptionPillarEle_5.setGeometry(QRect(30, 405, 113, 27))
        self.inputPhase_InceptionPillarEle_6 = QLineEdit(self.inputPhase_InceptionPillarWidget)
        self.inputPhase_InceptionPillarEle_6.setObjectName(u"inputPhase_InceptionPillarEle_6")
        self.inputPhase_InceptionPillarEle_6.setGeometry(QRect(30, 475, 113, 27))
        self.inputPhase_InceptionPillarEle_7 = QLineEdit(self.inputPhase_InceptionPillarWidget)
        self.inputPhase_InceptionPillarEle_7.setObjectName(u"inputPhase_InceptionPillarEle_7")
        self.inputPhase_InceptionPillarEle_7.setGeometry(QRect(30, 545, 113, 27))
        self.inputPhaseTransformLE = QLineEdit(self.inputPhaseWidget)
        self.inputPhaseTransformLE.setObjectName(u"inputPhaseTransformLE")
        self.inputPhaseTransformLE.setGeometry(QRect(220, 55, 113, 27))
        self.inputPhase_TransformSummaryTE = QTextEdit(self.inputPhaseWidget)
        self.inputPhase_TransformSummaryTE.setObjectName(u"inputPhase_TransformSummaryTE")
        self.inputPhase_TransformSummaryTE.setGeometry(QRect(175, 145, 201, 106))
        self.inputPhase_UploadImageLabel = QLabel(self.inputPhaseWidget)
        self.inputPhase_UploadImageLabel.setObjectName(u"inputPhase_UploadImageLabel")
        self.inputPhase_UploadImageLabel.setGeometry(QRect(10, 15, 150, 100))
        self.identityPhaseWidget = QWidget(self.scrollAreaWidgetContents)
        self.identityPhaseWidget.setObjectName(u"identityPhaseWidget")
        self.identityPhaseWidget.setGeometry(QRect(1490, 475, 566, 881))
        self.identityPhase_InputPillarWidget = QWidget(self.identityPhaseWidget)
        self.identityPhase_InputPillarWidget.setObjectName(u"identityPhase_InputPillarWidget")
        self.identityPhase_InputPillarWidget.setGeometry(QRect(0, 275, 150, 600))
        sizePolicy4.setHeightForWidth(self.identityPhase_InputPillarWidget.sizePolicy().hasHeightForWidth())
        self.identityPhase_InputPillarWidget.setSizePolicy(sizePolicy4)
        self.identityPhase_InputPillarEle_1 = QLineEdit(self.identityPhase_InputPillarWidget)
        self.identityPhase_InputPillarEle_1.setObjectName(u"identityPhase_InputPillarEle_1")
        self.identityPhase_InputPillarEle_1.setGeometry(QRect(20, 125, 113, 27))
        self.identityPhase_InputPillarEle_2 = QLineEdit(self.identityPhase_InputPillarWidget)
        self.identityPhase_InputPillarEle_2.setObjectName(u"identityPhase_InputPillarEle_2")
        self.identityPhase_InputPillarEle_2.setGeometry(QRect(20, 195, 113, 27))
        self.identityPhase_InputPillarEle_3 = QLineEdit(self.identityPhase_InputPillarWidget)
        self.identityPhase_InputPillarEle_3.setObjectName(u"identityPhase_InputPillarEle_3")
        self.identityPhase_InputPillarEle_3.setGeometry(QRect(20, 265, 113, 27))
        self.identityPhase_InputPillarEle_4 = QLineEdit(self.identityPhase_InputPillarWidget)
        self.identityPhase_InputPillarEle_4.setObjectName(u"identityPhase_InputPillarEle_4")
        self.identityPhase_InputPillarEle_4.setGeometry(QRect(20, 335, 113, 27))
        self.identityPhase_InputPillarEle_5 = QLineEdit(self.identityPhase_InputPillarWidget)
        self.identityPhase_InputPillarEle_5.setObjectName(u"identityPhase_InputPillarEle_5")
        self.identityPhase_InputPillarEle_5.setGeometry(QRect(20, 410, 113, 27))
        self.identityPhase_InputPillarEle_6 = QLineEdit(self.identityPhase_InputPillarWidget)
        self.identityPhase_InputPillarEle_6.setObjectName(u"identityPhase_InputPillarEle_6")
        self.identityPhase_InputPillarEle_6.setGeometry(QRect(20, 480, 113, 27))
        self.identityPhase_InputPillarEle_7 = QLineEdit(self.identityPhase_InputPillarWidget)
        self.identityPhase_InputPillarEle_7.setObjectName(u"identityPhase_InputPillarEle_7")
        self.identityPhase_InputPillarEle_7.setGeometry(QRect(20, 550, 113, 27))
        self.identityPhase_InputPillarModLE = QLineEdit(self.identityPhase_InputPillarWidget)
        self.identityPhase_InputPillarModLE.setObjectName(u"identityPhase_InputPillarModLE")
        self.identityPhase_InputPillarModLE.setGeometry(QRect(20, 35, 113, 27))
        self.identityPhase_IdentityPillarWidget = QWidget(self.identityPhaseWidget)
        self.identityPhase_IdentityPillarWidget.setObjectName(u"identityPhase_IdentityPillarWidget")
        self.identityPhase_IdentityPillarWidget.setGeometry(QRect(200, 275, 150, 600))
        sizePolicy4.setHeightForWidth(self.identityPhase_IdentityPillarWidget.sizePolicy().hasHeightForWidth())
        self.identityPhase_IdentityPillarWidget.setSizePolicy(sizePolicy4)
        self.identityPhase_IdentityPillarEle_1 = QLineEdit(self.identityPhase_IdentityPillarWidget)
        self.identityPhase_IdentityPillarEle_1.setObjectName(u"identityPhase_IdentityPillarEle_1")
        self.identityPhase_IdentityPillarEle_1.setGeometry(QRect(20, 125, 113, 27))
        self.identityPhase_IdentityPillarEle_2 = QLineEdit(self.identityPhase_IdentityPillarWidget)
        self.identityPhase_IdentityPillarEle_2.setObjectName(u"identityPhase_IdentityPillarEle_2")
        self.identityPhase_IdentityPillarEle_2.setGeometry(QRect(20, 195, 113, 27))
        self.identityPhase_IdentityPillarEle_3 = QLineEdit(self.identityPhase_IdentityPillarWidget)
        self.identityPhase_IdentityPillarEle_3.setObjectName(u"identityPhase_IdentityPillarEle_3")
        self.identityPhase_IdentityPillarEle_3.setGeometry(QRect(20, 265, 113, 27))
        self.identityPhase_IdentityPillarEle_4 = QLineEdit(self.identityPhase_IdentityPillarWidget)
        self.identityPhase_IdentityPillarEle_4.setObjectName(u"identityPhase_IdentityPillarEle_4")
        self.identityPhase_IdentityPillarEle_4.setGeometry(QRect(20, 335, 113, 27))
        self.identityPhase_IdentityPillarEle_5 = QLineEdit(self.identityPhase_IdentityPillarWidget)
        self.identityPhase_IdentityPillarEle_5.setObjectName(u"identityPhase_IdentityPillarEle_5")
        self.identityPhase_IdentityPillarEle_5.setGeometry(QRect(25, 410, 113, 27))
        self.identityPhase_IdentityPillarEle_6 = QLineEdit(self.identityPhase_IdentityPillarWidget)
        self.identityPhase_IdentityPillarEle_6.setObjectName(u"identityPhase_IdentityPillarEle_6")
        self.identityPhase_IdentityPillarEle_6.setGeometry(QRect(25, 480, 113, 27))
        self.identityPhase_IdentityPillarEle_7 = QLineEdit(self.identityPhase_IdentityPillarWidget)
        self.identityPhase_IdentityPillarEle_7.setObjectName(u"identityPhase_IdentityPillarEle_7")
        self.identityPhase_IdentityPillarEle_7.setGeometry(QRect(25, 550, 113, 27))
        self.identityPhase_IdentityPillarModLE = QLineEdit(self.identityPhase_IdentityPillarWidget)
        self.identityPhase_IdentityPillarModLE.setObjectName(u"identityPhase_IdentityPillarModLE")
        self.identityPhase_IdentityPillarModLE.setGeometry(QRect(15, 40, 113, 27))
        self.identityPhase_InceptionPillarWidget = QWidget(self.identityPhaseWidget)
        self.identityPhase_InceptionPillarWidget.setObjectName(u"identityPhase_InceptionPillarWidget")
        self.identityPhase_InceptionPillarWidget.setGeometry(QRect(400, 275, 150, 600))
        sizePolicy4.setHeightForWidth(self.identityPhase_InceptionPillarWidget.sizePolicy().hasHeightForWidth())
        self.identityPhase_InceptionPillarWidget.setSizePolicy(sizePolicy4)
        self.identityPhase_InceptionPillarEle_1 = QLineEdit(self.identityPhase_InceptionPillarWidget)
        self.identityPhase_InceptionPillarEle_1.setObjectName(u"identityPhase_InceptionPillarEle_1")
        self.identityPhase_InceptionPillarEle_1.setGeometry(QRect(25, 125, 113, 27))
        self.identityPhase_InceptionPillarEle_2 = QLineEdit(self.identityPhase_InceptionPillarWidget)
        self.identityPhase_InceptionPillarEle_2.setObjectName(u"identityPhase_InceptionPillarEle_2")
        self.identityPhase_InceptionPillarEle_2.setGeometry(QRect(25, 195, 113, 27))
        self.identityPhase_InceptionPillarEle_3 = QLineEdit(self.identityPhase_InceptionPillarWidget)
        self.identityPhase_InceptionPillarEle_3.setObjectName(u"identityPhase_InceptionPillarEle_3")
        self.identityPhase_InceptionPillarEle_3.setGeometry(QRect(25, 265, 113, 27))
        self.identityPhase_InceptionPillarEle_4 = QLineEdit(self.identityPhase_InceptionPillarWidget)
        self.identityPhase_InceptionPillarEle_4.setObjectName(u"identityPhase_InceptionPillarEle_4")
        self.identityPhase_InceptionPillarEle_4.setGeometry(QRect(25, 335, 113, 27))
        self.identityPhase_InceptionPillarEle_5 = QLineEdit(self.identityPhase_InceptionPillarWidget)
        self.identityPhase_InceptionPillarEle_5.setObjectName(u"identityPhase_InceptionPillarEle_5")
        self.identityPhase_InceptionPillarEle_5.setGeometry(QRect(25, 410, 113, 27))
        self.identityPhase_InceptionPillarEle_6 = QLineEdit(self.identityPhase_InceptionPillarWidget)
        self.identityPhase_InceptionPillarEle_6.setObjectName(u"identityPhase_InceptionPillarEle_6")
        self.identityPhase_InceptionPillarEle_6.setGeometry(QRect(25, 480, 113, 27))
        self.identityPhase_InceptionPillarEle_7 = QLineEdit(self.identityPhase_InceptionPillarWidget)
        self.identityPhase_InceptionPillarEle_7.setObjectName(u"identityPhase_InceptionPillarEle_7")
        self.identityPhase_InceptionPillarEle_7.setGeometry(QRect(25, 550, 113, 27))
        self.identityPhase_InceptionPillarModLE = QLineEdit(self.identityPhase_InceptionPillarWidget)
        self.identityPhase_InceptionPillarModLE.setObjectName(u"identityPhase_InceptionPillarModLE")
        self.identityPhase_InceptionPillarModLE.setGeometry(QRect(20, 40, 113, 27))
        self.identityPhaseTransformLE = QLineEdit(self.identityPhaseWidget)
        self.identityPhaseTransformLE.setObjectName(u"identityPhaseTransformLE")
        self.identityPhaseTransformLE.setGeometry(QRect(220, 55, 113, 27))
        self.identityPhase_TransformSummaryTE = QTextEdit(self.identityPhaseWidget)
        self.identityPhase_TransformSummaryTE.setObjectName(u"identityPhase_TransformSummaryTE")
        self.identityPhase_TransformSummaryTE.setGeometry(QRect(175, 150, 201, 106))
        self.identityPhase_UploadImageLabel = QLabel(self.identityPhaseWidget)
        self.identityPhase_UploadImageLabel.setObjectName(u"identityPhase_UploadImageLabel")
        self.identityPhase_UploadImageLabel.setGeometry(QRect(10, 15, 150, 100))
        self.inceptionPhaseWidget = QWidget(self.scrollAreaWidgetContents)
        self.inceptionPhaseWidget.setObjectName(u"inceptionPhaseWidget")
        self.inceptionPhaseWidget.setGeometry(QRect(2090, 470, 566, 881))
        self.inceptionPhase_InputPillarWidget = QWidget(self.inceptionPhaseWidget)
        self.inceptionPhase_InputPillarWidget.setObjectName(u"inceptionPhase_InputPillarWidget")
        self.inceptionPhase_InputPillarWidget.setGeometry(QRect(0, 275, 150, 600))
        sizePolicy4.setHeightForWidth(self.inceptionPhase_InputPillarWidget.sizePolicy().hasHeightForWidth())
        self.inceptionPhase_InputPillarWidget.setSizePolicy(sizePolicy4)
        self.inceptionPhase_InputPillarEle_1 = QLineEdit(self.inceptionPhase_InputPillarWidget)
        self.inceptionPhase_InputPillarEle_1.setObjectName(u"inceptionPhase_InputPillarEle_1")
        self.inceptionPhase_InputPillarEle_1.setGeometry(QRect(5, 130, 113, 27))
        self.inceptionPhase_InputPillarEle_2 = QLineEdit(self.inceptionPhase_InputPillarWidget)
        self.inceptionPhase_InputPillarEle_2.setObjectName(u"inceptionPhase_InputPillarEle_2")
        self.inceptionPhase_InputPillarEle_2.setGeometry(QRect(5, 200, 113, 27))
        self.inceptionPhase_InputPillarEle_3 = QLineEdit(self.inceptionPhase_InputPillarWidget)
        self.inceptionPhase_InputPillarEle_3.setObjectName(u"inceptionPhase_InputPillarEle_3")
        self.inceptionPhase_InputPillarEle_3.setGeometry(QRect(5, 270, 113, 27))
        self.inceptionPhase_InputPillarEle_4 = QLineEdit(self.inceptionPhase_InputPillarWidget)
        self.inceptionPhase_InputPillarEle_4.setObjectName(u"inceptionPhase_InputPillarEle_4")
        self.inceptionPhase_InputPillarEle_4.setGeometry(QRect(5, 340, 113, 27))
        self.inceptionPhase_InputPillarEle_5 = QLineEdit(self.inceptionPhase_InputPillarWidget)
        self.inceptionPhase_InputPillarEle_5.setObjectName(u"inceptionPhase_InputPillarEle_5")
        self.inceptionPhase_InputPillarEle_5.setGeometry(QRect(5, 415, 113, 27))
        self.inceptionPhase_InputPillarEle_6 = QLineEdit(self.inceptionPhase_InputPillarWidget)
        self.inceptionPhase_InputPillarEle_6.setObjectName(u"inceptionPhase_InputPillarEle_6")
        self.inceptionPhase_InputPillarEle_6.setGeometry(QRect(5, 485, 113, 27))
        self.inceptionPhase_InputPillarEle_7 = QLineEdit(self.inceptionPhase_InputPillarWidget)
        self.inceptionPhase_InputPillarEle_7.setObjectName(u"inceptionPhase_InputPillarEle_7")
        self.inceptionPhase_InputPillarEle_7.setGeometry(QRect(5, 555, 113, 27))
        self.inceptionPhase_InputPillarModLE = QLineEdit(self.inceptionPhase_InputPillarWidget)
        self.inceptionPhase_InputPillarModLE.setObjectName(u"inceptionPhase_InputPillarModLE")
        self.inceptionPhase_InputPillarModLE.setGeometry(QRect(5, 45, 113, 27))
        self.inceptionPhase_IdentityPillarWidget = QWidget(self.inceptionPhaseWidget)
        self.inceptionPhase_IdentityPillarWidget.setObjectName(u"inceptionPhase_IdentityPillarWidget")
        self.inceptionPhase_IdentityPillarWidget.setGeometry(QRect(200, 275, 150, 600))
        sizePolicy4.setHeightForWidth(self.inceptionPhase_IdentityPillarWidget.sizePolicy().hasHeightForWidth())
        self.inceptionPhase_IdentityPillarWidget.setSizePolicy(sizePolicy4)
        self.inceptionPhase_IdentityPillarEle_1 = QLineEdit(self.inceptionPhase_IdentityPillarWidget)
        self.inceptionPhase_IdentityPillarEle_1.setObjectName(u"inceptionPhase_IdentityPillarEle_1")
        self.inceptionPhase_IdentityPillarEle_1.setGeometry(QRect(10, 130, 113, 27))
        self.inceptionPhase_IdentityPillarEle_2 = QLineEdit(self.inceptionPhase_IdentityPillarWidget)
        self.inceptionPhase_IdentityPillarEle_2.setObjectName(u"inceptionPhase_IdentityPillarEle_2")
        self.inceptionPhase_IdentityPillarEle_2.setGeometry(QRect(10, 200, 113, 27))
        self.inceptionPhase_IdentityPillarEle_3 = QLineEdit(self.inceptionPhase_IdentityPillarWidget)
        self.inceptionPhase_IdentityPillarEle_3.setObjectName(u"inceptionPhase_IdentityPillarEle_3")
        self.inceptionPhase_IdentityPillarEle_3.setGeometry(QRect(10, 270, 113, 27))
        self.inceptionPhase_IdentityPillarEle_4 = QLineEdit(self.inceptionPhase_IdentityPillarWidget)
        self.inceptionPhase_IdentityPillarEle_4.setObjectName(u"inceptionPhase_IdentityPillarEle_4")
        self.inceptionPhase_IdentityPillarEle_4.setGeometry(QRect(10, 340, 113, 27))
        self.inceptionPhase_IdentityPillarEle_5 = QLineEdit(self.inceptionPhase_IdentityPillarWidget)
        self.inceptionPhase_IdentityPillarEle_5.setObjectName(u"inceptionPhase_IdentityPillarEle_5")
        self.inceptionPhase_IdentityPillarEle_5.setGeometry(QRect(15, 415, 113, 27))
        self.inceptionPhase_IdentityPillarEle_6 = QLineEdit(self.inceptionPhase_IdentityPillarWidget)
        self.inceptionPhase_IdentityPillarEle_6.setObjectName(u"inceptionPhase_IdentityPillarEle_6")
        self.inceptionPhase_IdentityPillarEle_6.setGeometry(QRect(10, 485, 113, 27))
        self.inceptionPhase_IdentityPillarEle_7 = QLineEdit(self.inceptionPhase_IdentityPillarWidget)
        self.inceptionPhase_IdentityPillarEle_7.setObjectName(u"inceptionPhase_IdentityPillarEle_7")
        self.inceptionPhase_IdentityPillarEle_7.setGeometry(QRect(10, 555, 113, 27))
        self.inceptionPhase_IdentityPillarModLE = QLineEdit(self.inceptionPhase_IdentityPillarWidget)
        self.inceptionPhase_IdentityPillarModLE.setObjectName(u"inceptionPhase_IdentityPillarModLE")
        self.inceptionPhase_IdentityPillarModLE.setGeometry(QRect(10, 45, 113, 27))
        self.inceptionPhase_InceptionPillarWidget = QWidget(self.inceptionPhaseWidget)
        self.inceptionPhase_InceptionPillarWidget.setObjectName(u"inceptionPhase_InceptionPillarWidget")
        self.inceptionPhase_InceptionPillarWidget.setGeometry(QRect(400, 275, 150, 600))
        sizePolicy4.setHeightForWidth(self.inceptionPhase_InceptionPillarWidget.sizePolicy().hasHeightForWidth())
        self.inceptionPhase_InceptionPillarWidget.setSizePolicy(sizePolicy4)
        self.inceptionPhase_InceptionPillarEle_1 = QLineEdit(self.inceptionPhase_InceptionPillarWidget)
        self.inceptionPhase_InceptionPillarEle_1.setObjectName(u"inceptionPhase_InceptionPillarEle_1")
        self.inceptionPhase_InceptionPillarEle_1.setGeometry(QRect(10, 130, 113, 27))
        self.inceptionPhase_InceptionPillarEle_2 = QLineEdit(self.inceptionPhase_InceptionPillarWidget)
        self.inceptionPhase_InceptionPillarEle_2.setObjectName(u"inceptionPhase_InceptionPillarEle_2")
        self.inceptionPhase_InceptionPillarEle_2.setGeometry(QRect(10, 200, 113, 27))
        self.inceptionPhase_InceptionPillarEle_3 = QLineEdit(self.inceptionPhase_InceptionPillarWidget)
        self.inceptionPhase_InceptionPillarEle_3.setObjectName(u"inceptionPhase_InceptionPillarEle_3")
        self.inceptionPhase_InceptionPillarEle_3.setGeometry(QRect(10, 270, 113, 27))
        self.inceptionPhase_InceptionPillarEle_4 = QLineEdit(self.inceptionPhase_InceptionPillarWidget)
        self.inceptionPhase_InceptionPillarEle_4.setObjectName(u"inceptionPhase_InceptionPillarEle_4")
        self.inceptionPhase_InceptionPillarEle_4.setGeometry(QRect(10, 340, 113, 27))
        self.inceptionPhase_InceptionPillarEle_5 = QLineEdit(self.inceptionPhase_InceptionPillarWidget)
        self.inceptionPhase_InceptionPillarEle_5.setObjectName(u"inceptionPhase_InceptionPillarEle_5")
        self.inceptionPhase_InceptionPillarEle_5.setGeometry(QRect(10, 415, 113, 27))
        self.inceptionPhase_InceptionPillarEle_6 = QLineEdit(self.inceptionPhase_InceptionPillarWidget)
        self.inceptionPhase_InceptionPillarEle_6.setObjectName(u"inceptionPhase_InceptionPillarEle_6")
        self.inceptionPhase_InceptionPillarEle_6.setGeometry(QRect(10, 485, 113, 27))
        self.inceptionPhase_InceptionPillarEle_7 = QLineEdit(self.inceptionPhase_InceptionPillarWidget)
        self.inceptionPhase_InceptionPillarEle_7.setObjectName(u"inceptionPhase_InceptionPillarEle_7")
        self.inceptionPhase_InceptionPillarEle_7.setGeometry(QRect(10, 555, 113, 27))
        self.inceptionPhase_InceptionPillarModLE = QLineEdit(self.inceptionPhase_InceptionPillarWidget)
        self.inceptionPhase_InceptionPillarModLE.setObjectName(u"inceptionPhase_InceptionPillarModLE")
        self.inceptionPhase_InceptionPillarModLE.setGeometry(QRect(10, 45, 113, 27))
        self.inceptionPhaseTransformLE = QLineEdit(self.inceptionPhaseWidget)
        self.inceptionPhaseTransformLE.setObjectName(u"inceptionPhaseTransformLE")
        self.inceptionPhaseTransformLE.setGeometry(QRect(210, 60, 113, 27))
        self.inceptionPhase_TransformSummaryTE = QTextEdit(self.inceptionPhaseWidget)
        self.inceptionPhase_TransformSummaryTE.setObjectName(u"inceptionPhase_TransformSummaryTE")
        self.inceptionPhase_TransformSummaryTE.setGeometry(QRect(165, 150, 201, 106))
        self.inceptionPhase_UploadImageLabel = QLabel(self.inceptionPhaseWidget)
        self.inceptionPhase_UploadImageLabel.setObjectName(u"inceptionPhase_UploadImageLabel")
        self.inceptionPhase_UploadImageLabel.setGeometry(QRect(5, 15, 150, 100))
        self.controlsWidget = QWidget(self.scrollAreaWidgetContents)
        self.controlsWidget.setObjectName(u"controlsWidget")
        self.controlsWidget.setGeometry(QRect(2625, 1409, 566, 45))
        self.horizontalLayout_21 = QHBoxLayout(self.controlsWidget)
        self.horizontalLayout_21.setObjectName(u"horizontalLayout_21")
        self.resetBtn = QPushButton(self.controlsWidget)
        self.resetBtn.setObjectName(u"resetBtn")

        self.horizontalLayout_21.addWidget(self.resetBtn)

        self.loadDatasetBtn = QPushButton(self.controlsWidget)
        self.loadDatasetBtn.setObjectName(u"loadDatasetBtn")

        self.horizontalLayout_21.addWidget(self.loadDatasetBtn)

        self.horizontalSpacer = QSpacerItem(40, 20, QSizePolicy.Policy.Minimum, QSizePolicy.Policy.Expanding)

        self.horizontalLayout_21.addItem(self.horizontalSpacer)

        self.saveBtn = QPushButton(self.controlsWidget)
        self.saveBtn.setObjectName(u"saveBtn")

        self.horizontalLayout_21.addWidget(self.saveBtn)

        self.applyBtn = QPushButton(self.controlsWidget)
        self.applyBtn.setObjectName(u"applyBtn")

        self.horizontalLayout_21.addWidget(self.applyBtn)

        self.templateNameLabel = QLabel(self.scrollAreaWidgetContents)
        self.templateNameLabel.setObjectName(u"templateNameLabel")
        self.templateNameLabel.setGeometry(QRect(25, 20, 116, 21))
        self.templateNameLE = QLineEdit(self.scrollAreaWidgetContents)
        self.templateNameLE.setObjectName(u"templateNameLE")
        self.templateNameLE.setGeometry(QRect(140, 20, 216, 27))
        self.descriptionLabel = QLabel(self.scrollAreaWidgetContents)
        self.descriptionLabel.setObjectName(u"descriptionLabel")
        self.descriptionLabel.setGeometry(QRect(490, 20, 86, 19))
        self.descriptionTE = QTextEdit(self.scrollAreaWidgetContents)
        self.descriptionTE.setObjectName(u"descriptionTE")
        self.descriptionTE.setGeometry(QRect(580, 20, 536, 206))
        self.classificationLabel = QLabel(self.scrollAreaWidgetContents)
        self.classificationLabel.setObjectName(u"classificationLabel")
        self.classificationLabel.setGeometry(QRect(25, 50, 101, 19))
        self.departmentLabel = QLabel(self.scrollAreaWidgetContents)
        self.departmentLabel.setObjectName(u"departmentLabel")
        self.departmentLabel.setGeometry(QRect(25, 80, 101, 19))
        self.authorLabel = QLabel(self.scrollAreaWidgetContents)
        self.authorLabel.setObjectName(u"authorLabel")
        self.authorLabel.setGeometry(QRect(25, 110, 66, 19))
        self.classificationLE = QLineEdit(self.scrollAreaWidgetContents)
        self.classificationLE.setObjectName(u"classificationLE")
        self.classificationLE.setGeometry(QRect(140, 50, 216, 27))
        self.departmentLE = QLineEdit(self.scrollAreaWidgetContents)
        self.departmentLE.setObjectName(u"departmentLE")
        self.departmentLE.setGeometry(QRect(140, 80, 216, 27))
        self.authorLE = QLineEdit(self.scrollAreaWidgetContents)
        self.authorLE.setObjectName(u"authorLE")
        self.authorLE.setGeometry(QRect(140, 110, 216, 27))
        self.notesLabel = QLabel(self.scrollAreaWidgetContents)
        self.notesLabel.setObjectName(u"notesLabel")
        self.notesLabel.setGeometry(QRect(2840, 20, 56, 19))
        self.notesTE = QTextEdit(self.scrollAreaWidgetContents)
        self.notesTE.setObjectName(u"notesTE")
        self.notesTE.setGeometry(QRect(2895, 20, 536, 281))
        self.horizontalScrollBar = QScrollBar(self.scrollAreaWidgetContents)
        self.horizontalScrollBar.setObjectName(u"horizontalScrollBar")
        self.horizontalScrollBar.setGeometry(QRect(10, 10, 160, 16))
        self.scrollArea.setWidget(self.scrollAreaWidgetContents)

        self.verticalLayout_33.addWidget(self.scrollArea)

        self.mainStackedWidget.addWidget(self.template_EditorPage)
        self.mainEnginePage = QWidget()
        self.mainEnginePage.setObjectName(u"mainEnginePage")
        self.verticalLayout_61 = QVBoxLayout(self.mainEnginePage)
        self.verticalLayout_61.setObjectName(u"verticalLayout_61")
        self.controllerFrame_2 = QFrame(self.mainEnginePage)
        self.controllerFrame_2.setObjectName(u"controllerFrame_2")
        self.controllerFrame_2.setFrameShape(QFrame.NoFrame)
        self.horizontalLayout_22 = QHBoxLayout(self.controllerFrame_2)
        self.horizontalLayout_22.setObjectName(u"horizontalLayout_22")
        self.rhetoricalArcsFrame = QFrame(self.controllerFrame_2)
        self.rhetoricalArcsFrame.setObjectName(u"rhetoricalArcsFrame")
        self.rhetoricalArcsFrame.setFrameShape(QFrame.NoFrame)
        self.verticalLayout_34 = QVBoxLayout(self.rhetoricalArcsFrame)
        self.verticalLayout_34.setObjectName(u"verticalLayout_34")
        self.inputManifoldFrame = QFrame(self.rhetoricalArcsFrame)
        self.inputManifoldFrame.setObjectName(u"inputManifoldFrame")
        self.inputManifoldFrame.setFont(font)
        self.inputManifoldFrame.setFrameShape(QFrame.NoFrame)
        self.verticalLayout_35 = QVBoxLayout(self.inputManifoldFrame)
        self.verticalLayout_35.setObjectName(u"verticalLayout_35")
        self.essenceLabel = QLabel(self.inputManifoldFrame)
        self.essenceLabel.setObjectName(u"essenceLabel")
        self.essenceLabel.setFont(font)

        self.verticalLayout_35.addWidget(self.essenceLabel)

        self.essenceTE = QTextEdit(self.inputManifoldFrame)
        self.essenceTE.setObjectName(u"essenceTE")
        self.essenceTE.setReadOnly(True)

        self.verticalLayout_35.addWidget(self.essenceTE)

        self.formLabel = QLabel(self.inputManifoldFrame)
        self.formLabel.setObjectName(u"formLabel")
        self.formLabel.setFont(font)

        self.verticalLayout_35.addWidget(self.formLabel)

        self.formTE = QTextEdit(self.inputManifoldFrame)
        self.formTE.setObjectName(u"formTE")
        self.formTE.setReadOnly(True)

        self.verticalLayout_35.addWidget(self.formTE)

        self.actionLabel = QLabel(self.inputManifoldFrame)
        self.actionLabel.setObjectName(u"actionLabel")
        self.actionLabel.setFont(font)

        self.verticalLayout_35.addWidget(self.actionLabel)

        self.actionTE = QTextEdit(self.inputManifoldFrame)
        self.actionTE.setObjectName(u"actionTE")
        self.actionTE.setReadOnly(True)

        self.verticalLayout_35.addWidget(self.actionTE)

        self.frameLabel = QLabel(self.inputManifoldFrame)
        self.frameLabel.setObjectName(u"frameLabel")
        self.frameLabel.setFont(font)

        self.verticalLayout_35.addWidget(self.frameLabel)

        self.frameTE = QTextEdit(self.inputManifoldFrame)
        self.frameTE.setObjectName(u"frameTE")
        self.frameTE.setReadOnly(True)

        self.verticalLayout_35.addWidget(self.frameTE)

        self.intentLabel = QLabel(self.inputManifoldFrame)
        self.intentLabel.setObjectName(u"intentLabel")
        self.intentLabel.setFont(font)

        self.verticalLayout_35.addWidget(self.intentLabel)

        self.intentTE = QTextEdit(self.inputManifoldFrame)
        self.intentTE.setObjectName(u"intentTE")
        self.intentTE.setReadOnly(True)

        self.verticalLayout_35.addWidget(self.intentTE)

        self.relationalArcLabel = QLabel(self.inputManifoldFrame)
        self.relationalArcLabel.setObjectName(u"relationalArcLabel")
        self.relationalArcLabel.setFont(font)

        self.verticalLayout_35.addWidget(self.relationalArcLabel)

        self.relationTE = QTextEdit(self.inputManifoldFrame)
        self.relationTE.setObjectName(u"relationTE")
        self.relationTE.setReadOnly(True)

        self.verticalLayout_35.addWidget(self.relationTE)

        self.valueLabel = QLabel(self.inputManifoldFrame)
        self.valueLabel.setObjectName(u"valueLabel")
        self.valueLabel.setFont(font)

        self.verticalLayout_35.addWidget(self.valueLabel)

        self.valueTE = QTextEdit(self.inputManifoldFrame)
        self.valueTE.setObjectName(u"valueTE")

        self.verticalLayout_35.addWidget(self.valueTE)


        self.verticalLayout_34.addWidget(self.inputManifoldFrame)


        self.horizontalLayout_22.addWidget(self.rhetoricalArcsFrame)

        self.engineCoreFrame = QFrame(self.controllerFrame_2)
        self.engineCoreFrame.setObjectName(u"engineCoreFrame")
        self.engineCoreFrame.setFrameShape(QFrame.NoFrame)
        self.verticalLayout_36 = QVBoxLayout(self.engineCoreFrame)
        self.verticalLayout_36.setSpacing(3)
        self.verticalLayout_36.setObjectName(u"verticalLayout_36")
        self.verticalLayout_36.setContentsMargins(3, 3, 3, 3)
        self.transformsHorLO = QVBoxLayout()
        self.transformsHorLO.setObjectName(u"transformsHorLO")
        self.transformsGB = QGroupBox(self.engineCoreFrame)
        self.transformsGB.setObjectName(u"transformsGB")
        font1 = QFont()
        font1.setFamilies([u"JetBrains Mono"])
        font1.setPointSize(11)
        font1.setBold(True)
        font1.setItalic(False)
        self.transformsGB.setFont(font1)
        self.transformsGB.setFlat(True)
        self.horizontalLayout_23 = QHBoxLayout(self.transformsGB)
        self.horizontalLayout_23.setSpacing(3)
        self.horizontalLayout_23.setObjectName(u"horizontalLayout_23")
        self.horizontalLayout_23.setContentsMargins(3, 40, 3, 3)
        self.phasesGB = QGroupBox(self.transformsGB)
        self.phasesGB.setObjectName(u"phasesGB")
        font2 = QFont()
        font2.setFamilies([u"JetBrains Mono"])
        font2.setPointSize(11)
        font2.setBold(True)
        font2.setItalic(True)
        font2.setUnderline(False)
        self.phasesGB.setFont(font2)
        self.phasesGB.setFlat(True)
        self.verticalLayout_37 = QVBoxLayout(self.phasesGB)
        self.verticalLayout_37.setSpacing(3)
        self.verticalLayout_37.setObjectName(u"verticalLayout_37")
        self.verticalLayout_37.setContentsMargins(3, 18, 3, 3)
        self.inputPhaseBtn = QPushButton(self.phasesGB)
        self.inputPhaseBtn.setObjectName(u"inputPhaseBtn")

        self.verticalLayout_37.addWidget(self.inputPhaseBtn)

        self.identityPhaseBtn = QPushButton(self.phasesGB)
        self.identityPhaseBtn.setObjectName(u"identityPhaseBtn")

        self.verticalLayout_37.addWidget(self.identityPhaseBtn)

        self.inceptionPhaseBtn = QPushButton(self.phasesGB)
        self.inceptionPhaseBtn.setObjectName(u"inceptionPhaseBtn")

        self.verticalLayout_37.addWidget(self.inceptionPhaseBtn)

        self.verticalSpacer_10 = QSpacerItem(20, 40, QSizePolicy.Policy.Minimum, QSizePolicy.Policy.Expanding)

        self.verticalLayout_37.addItem(self.verticalSpacer_10)


        self.horizontalLayout_23.addWidget(self.phasesGB)

        self.transformsStackedWidget = QStackedWidget(self.transformsGB)
        self.transformsStackedWidget.setObjectName(u"transformsStackedWidget")
        self.inputPhaseTransformPage_0 = QWidget()
        self.inputPhaseTransformPage_0.setObjectName(u"inputPhaseTransformPage_0")
        self.horizontalLayout_24 = QHBoxLayout(self.inputPhaseTransformPage_0)
        self.horizontalLayout_24.setObjectName(u"horizontalLayout_24")
        self.inputPhaseWidget_2 = QWidget(self.inputPhaseTransformPage_0)
        self.inputPhaseWidget_2.setObjectName(u"inputPhaseWidget_2")
        self.horizontalLayout_25 = QHBoxLayout(self.inputPhaseWidget_2)
        self.horizontalLayout_25.setObjectName(u"horizontalLayout_25")
        self.horizontalLayout_25.setContentsMargins(9, -1, -1, -1)
        self.inputPhase_TransformDynamicLabel = QLabel(self.inputPhaseWidget_2)
        self.inputPhase_TransformDynamicLabel.setObjectName(u"inputPhase_TransformDynamicLabel")

        self.horizontalLayout_25.addWidget(self.inputPhase_TransformDynamicLabel)

        self.inputPhase_TransformDynamicTE = QTextEdit(self.inputPhaseWidget_2)
        self.inputPhase_TransformDynamicTE.setObjectName(u"inputPhase_TransformDynamicTE")

        self.horizontalLayout_25.addWidget(self.inputPhase_TransformDynamicTE)

        self.horizontalLayout_25.setStretch(1, 80)

        self.horizontalLayout_24.addWidget(self.inputPhaseWidget_2)

        self.transformsStackedWidget.addWidget(self.inputPhaseTransformPage_0)
        self.identityPhase_TransformPage_1 = QWidget()
        self.identityPhase_TransformPage_1.setObjectName(u"identityPhase_TransformPage_1")
        self.horizontalLayout_26 = QHBoxLayout(self.identityPhase_TransformPage_1)
        self.horizontalLayout_26.setObjectName(u"horizontalLayout_26")
        self.identityPhaseWidget_2 = QWidget(self.identityPhase_TransformPage_1)
        self.identityPhaseWidget_2.setObjectName(u"identityPhaseWidget_2")
        self.horizontalLayout_27 = QHBoxLayout(self.identityPhaseWidget_2)
        self.horizontalLayout_27.setObjectName(u"horizontalLayout_27")
        self.identityPhase_TransformDynamicLabel = QLabel(self.identityPhaseWidget_2)
        self.identityPhase_TransformDynamicLabel.setObjectName(u"identityPhase_TransformDynamicLabel")

        self.horizontalLayout_27.addWidget(self.identityPhase_TransformDynamicLabel)

        self.identityPhase_TransformDynamicTE = QTextEdit(self.identityPhaseWidget_2)
        self.identityPhase_TransformDynamicTE.setObjectName(u"identityPhase_TransformDynamicTE")

        self.horizontalLayout_27.addWidget(self.identityPhase_TransformDynamicTE)

        self.horizontalLayout_27.setStretch(1, 80)

        self.horizontalLayout_26.addWidget(self.identityPhaseWidget_2)

        self.transformsStackedWidget.addWidget(self.identityPhase_TransformPage_1)
        self.inceptionPhase_TransformPage_2 = QWidget()
        self.inceptionPhase_TransformPage_2.setObjectName(u"inceptionPhase_TransformPage_2")
        self.horizontalLayout_28 = QHBoxLayout(self.inceptionPhase_TransformPage_2)
        self.horizontalLayout_28.setObjectName(u"horizontalLayout_28")
        self.inceptionPhaseWidget_2 = QWidget(self.inceptionPhase_TransformPage_2)
        self.inceptionPhaseWidget_2.setObjectName(u"inceptionPhaseWidget_2")
        self.horizontalLayout_29 = QHBoxLayout(self.inceptionPhaseWidget_2)
        self.horizontalLayout_29.setObjectName(u"horizontalLayout_29")
        self.inceptionPhase_TransformDynamicLabel = QLabel(self.inceptionPhaseWidget_2)
        self.inceptionPhase_TransformDynamicLabel.setObjectName(u"inceptionPhase_TransformDynamicLabel")

        self.horizontalLayout_29.addWidget(self.inceptionPhase_TransformDynamicLabel)

        self.inceptionPhase_TransformDynamicTE = QTextEdit(self.inceptionPhaseWidget_2)
        self.inceptionPhase_TransformDynamicTE.setObjectName(u"inceptionPhase_TransformDynamicTE")

        self.horizontalLayout_29.addWidget(self.inceptionPhase_TransformDynamicTE)

        self.horizontalLayout_29.setStretch(1, 80)

        self.horizontalLayout_28.addWidget(self.inceptionPhaseWidget_2)

        self.transformsStackedWidget.addWidget(self.inceptionPhase_TransformPage_2)

        self.horizontalLayout_23.addWidget(self.transformsStackedWidget)

        self.horizontalLayout_23.setStretch(1, 95)

        self.transformsHorLO.addWidget(self.transformsGB)


        self.verticalLayout_36.addLayout(self.transformsHorLO)

        self.modifiersGB = QGroupBox(self.engineCoreFrame)
        self.modifiersGB.setObjectName(u"modifiersGB")
        font3 = QFont()
        font3.setFamilies([u"JetBrains Mono"])
        font3.setPointSize(11)
        font3.setBold(True)
        font3.setItalic(True)
        self.modifiersGB.setFont(font3)
        self.modifiersGB.setFlat(True)
        self.horizontalLayout_30 = QHBoxLayout(self.modifiersGB)
        self.horizontalLayout_30.setSpacing(2)
        self.horizontalLayout_30.setObjectName(u"horizontalLayout_30")
        self.horizontalLayout_30.setContentsMargins(5, 20, 5, 5)
        self.arcsRB_GB = QGroupBox(self.modifiersGB)
        self.arcsRB_GB.setObjectName(u"arcsRB_GB")
        self.verticalLayout_38 = QVBoxLayout(self.arcsRB_GB)
        self.verticalLayout_38.setObjectName(u"verticalLayout_38")
        self.firstArcRB = QRadioButton(self.arcsRB_GB)
        self.firstArcRB.setObjectName(u"firstArcRB")

        self.verticalLayout_38.addWidget(self.firstArcRB)

        self.secondArcRB = QRadioButton(self.arcsRB_GB)
        self.secondArcRB.setObjectName(u"secondArcRB")

        self.verticalLayout_38.addWidget(self.secondArcRB)

        self.thirdArcRB = QRadioButton(self.arcsRB_GB)
        self.thirdArcRB.setObjectName(u"thirdArcRB")

        self.verticalLayout_38.addWidget(self.thirdArcRB)

        self.fourthArcRB = QRadioButton(self.arcsRB_GB)
        self.fourthArcRB.setObjectName(u"fourthArcRB")

        self.verticalLayout_38.addWidget(self.fourthArcRB)

        self.fifthArcRB = QRadioButton(self.arcsRB_GB)
        self.fifthArcRB.setObjectName(u"fifthArcRB")

        self.verticalLayout_38.addWidget(self.fifthArcRB)

        self.sixthArcRB = QRadioButton(self.arcsRB_GB)
        self.sixthArcRB.setObjectName(u"sixthArcRB")

        self.verticalLayout_38.addWidget(self.sixthArcRB)

        self.seventhArcRB = QRadioButton(self.arcsRB_GB)
        self.seventhArcRB.setObjectName(u"seventhArcRB")

        self.verticalLayout_38.addWidget(self.seventhArcRB)


        self.horizontalLayout_30.addWidget(self.arcsRB_GB)

        self.triadsWidget = QWidget(self.modifiersGB)
        self.triadsWidget.setObjectName(u"triadsWidget")
        self.verticalLayout_39 = QVBoxLayout(self.triadsWidget)
        self.verticalLayout_39.setObjectName(u"verticalLayout_39")
        self.triadBtnsGB = QGroupBox(self.triadsWidget)
        self.triadBtnsGB.setObjectName(u"triadBtnsGB")
        self.triadBtnsGB.setFont(font3)
        self.triadBtnsGB.setFlat(True)
        self.verticalLayout_40 = QVBoxLayout(self.triadBtnsGB)
        self.verticalLayout_40.setSpacing(3)
        self.verticalLayout_40.setObjectName(u"verticalLayout_40")
        self.verticalLayout_40.setContentsMargins(3, 18, 3, 3)
        self.computeFirstTriadBtn = QPushButton(self.triadBtnsGB)
        self.computeFirstTriadBtn.setObjectName(u"computeFirstTriadBtn")

        self.verticalLayout_40.addWidget(self.computeFirstTriadBtn)

        self.computeSecondTriadBtn = QPushButton(self.triadBtnsGB)
        self.computeSecondTriadBtn.setObjectName(u"computeSecondTriadBtn")

        self.verticalLayout_40.addWidget(self.computeSecondTriadBtn)

        self.computeThirdTriadBtn = QPushButton(self.triadBtnsGB)
        self.computeThirdTriadBtn.setObjectName(u"computeThirdTriadBtn")

        self.verticalLayout_40.addWidget(self.computeThirdTriadBtn)


        self.verticalLayout_39.addWidget(self.triadBtnsGB)


        self.horizontalLayout_30.addWidget(self.triadsWidget)

        self.modifierInputGB = QGroupBox(self.modifiersGB)
        self.modifierInputGB.setObjectName(u"modifierInputGB")
        self.modifierInputGB.setFont(font1)
        self.modifierInputGB.setFlat(True)
        self.verticalLayout_41 = QVBoxLayout(self.modifierInputGB)
        self.verticalLayout_41.setObjectName(u"verticalLayout_41")
        self.verticalLayout_41.setContentsMargins(1, 25, 1, 1)
        self.modifierInputLabel = QLabel(self.modifierInputGB)
        self.modifierInputLabel.setObjectName(u"modifierInputLabel")

        self.verticalLayout_41.addWidget(self.modifierInputLabel)

        self.modifierInputCB = QComboBox(self.modifierInputGB)
        self.modifierInputCB.addItem("")
        self.modifierInputCB.addItem("")
        self.modifierInputCB.addItem("")
        self.modifierInputCB.addItem("")
        self.modifierInputCB.setObjectName(u"modifierInputCB")

        self.verticalLayout_41.addWidget(self.modifierInputCB)


        self.horizontalLayout_30.addWidget(self.modifierInputGB)

        self.modifierIdentityGB = QGroupBox(self.modifiersGB)
        self.modifierIdentityGB.setObjectName(u"modifierIdentityGB")
        self.modifierIdentityGB.setFont(font1)
        self.modifierIdentityGB.setFlat(True)
        self.verticalLayout_42 = QVBoxLayout(self.modifierIdentityGB)
        self.verticalLayout_42.setObjectName(u"verticalLayout_42")
        self.verticalLayout_42.setContentsMargins(1, 25, 1, 1)
        self.modifierIdentityLabel = QLabel(self.modifierIdentityGB)
        self.modifierIdentityLabel.setObjectName(u"modifierIdentityLabel")

        self.verticalLayout_42.addWidget(self.modifierIdentityLabel)

        self.modifieridentityCB = QComboBox(self.modifierIdentityGB)
        self.modifieridentityCB.addItem("")
        self.modifieridentityCB.addItem("")
        self.modifieridentityCB.addItem("")
        self.modifieridentityCB.addItem("")
        self.modifieridentityCB.setObjectName(u"modifieridentityCB")

        self.verticalLayout_42.addWidget(self.modifieridentityCB)


        self.horizontalLayout_30.addWidget(self.modifierIdentityGB)

        self.modifierInceptionGB = QGroupBox(self.modifiersGB)
        self.modifierInceptionGB.setObjectName(u"modifierInceptionGB")
        self.modifierInceptionGB.setFont(font1)
        self.modifierInceptionGB.setFlat(True)
        self.verticalLayout_43 = QVBoxLayout(self.modifierInceptionGB)
        self.verticalLayout_43.setSpacing(3)
        self.verticalLayout_43.setObjectName(u"verticalLayout_43")
        self.verticalLayout_43.setContentsMargins(1, 25, 1, 1)
        self.modifierInceptionLabel = QLabel(self.modifierInceptionGB)
        self.modifierInceptionLabel.setObjectName(u"modifierInceptionLabel")

        self.verticalLayout_43.addWidget(self.modifierInceptionLabel)

        self.modifierInceptionCB = QComboBox(self.modifierInceptionGB)
        self.modifierInceptionCB.addItem("")
        self.modifierInceptionCB.addItem("")
        self.modifierInceptionCB.addItem("")
        self.modifierInceptionCB.addItem("")
        self.modifierInceptionCB.setObjectName(u"modifierInceptionCB")

        self.verticalLayout_43.addWidget(self.modifierInceptionCB)


        self.horizontalLayout_30.addWidget(self.modifierInceptionGB)

        self.horizontalLayout_30.setStretch(2, 30)
        self.horizontalLayout_30.setStretch(3, 30)
        self.horizontalLayout_30.setStretch(4, 31)

        self.verticalLayout_36.addWidget(self.modifiersGB)

        self.pipelinesGB = QGroupBox(self.engineCoreFrame)
        self.pipelinesGB.setObjectName(u"pipelinesGB")
        self.pipelinesGB.setFlat(True)
        self.horizontalLayout_31 = QHBoxLayout(self.pipelinesGB)
        self.horizontalLayout_31.setSpacing(2)
        self.horizontalLayout_31.setObjectName(u"horizontalLayout_31")
        self.horizontalLayout_31.setContentsMargins(1, 5, 1, 1)
        self.ranksWidget = QWidget(self.pipelinesGB)
        self.ranksWidget.setObjectName(u"ranksWidget")
        self.verticalLayout_44 = QVBoxLayout(self.ranksWidget)
        self.verticalLayout_44.setObjectName(u"verticalLayout_44")
        self.pillarRanksGB = QGroupBox(self.ranksWidget)
        self.pillarRanksGB.setObjectName(u"pillarRanksGB")
        font4 = QFont()
        font4.setFamilies([u"JetBrains Mono"])
        font4.setPointSize(11)
        font4.setBold(True)
        self.pillarRanksGB.setFont(font4)
        self.pillarRanksGB.setFlat(False)
        self.verticalLayout_45 = QVBoxLayout(self.pillarRanksGB)
        self.verticalLayout_45.setSpacing(6)
        self.verticalLayout_45.setObjectName(u"verticalLayout_45")
        self.verticalLayout_45.setContentsMargins(3, 18, 3, 0)
        self.pillarRanksWidget = QWidget(self.pillarRanksGB)
        self.pillarRanksWidget.setObjectName(u"pillarRanksWidget")
        self.verticalLayout_46 = QVBoxLayout(self.pillarRanksWidget)
        self.verticalLayout_46.setObjectName(u"verticalLayout_46")
        self.spinBox_7 = QSpinBox(self.pillarRanksWidget)
        self.spinBox_7.setObjectName(u"spinBox_7")
        self.spinBox_7.setMinimum(1)
        self.spinBox_7.setMaximum(7)

        self.verticalLayout_46.addWidget(self.spinBox_7)

        self.spinBox_6 = QSpinBox(self.pillarRanksWidget)
        self.spinBox_6.setObjectName(u"spinBox_6")
        self.spinBox_6.setMinimum(1)
        self.spinBox_6.setMaximum(7)
        self.spinBox_6.setValue(2)

        self.verticalLayout_46.addWidget(self.spinBox_6)

        self.spinBox_5 = QSpinBox(self.pillarRanksWidget)
        self.spinBox_5.setObjectName(u"spinBox_5")
        self.spinBox_5.setMinimum(1)
        self.spinBox_5.setMaximum(7)
        self.spinBox_5.setValue(3)

        self.verticalLayout_46.addWidget(self.spinBox_5)

        self.spinBox_4 = QSpinBox(self.pillarRanksWidget)
        self.spinBox_4.setObjectName(u"spinBox_4")
        self.spinBox_4.setMinimum(1)
        self.spinBox_4.setMaximum(7)
        self.spinBox_4.setValue(4)

        self.verticalLayout_46.addWidget(self.spinBox_4)

        self.spinBox_3 = QSpinBox(self.pillarRanksWidget)
        self.spinBox_3.setObjectName(u"spinBox_3")
        self.spinBox_3.setMinimum(1)
        self.spinBox_3.setMaximum(7)
        self.spinBox_3.setValue(5)

        self.verticalLayout_46.addWidget(self.spinBox_3)

        self.spinBox_2 = QSpinBox(self.pillarRanksWidget)
        self.spinBox_2.setObjectName(u"spinBox_2")
        self.spinBox_2.setMinimum(1)
        self.spinBox_2.setMaximum(7)
        self.spinBox_2.setValue(6)

        self.verticalLayout_46.addWidget(self.spinBox_2)

        self.spinBox_1 = QSpinBox(self.pillarRanksWidget)
        self.spinBox_1.setObjectName(u"spinBox_1")
        self.spinBox_1.setMinimum(1)
        self.spinBox_1.setMaximum(7)
        self.spinBox_1.setValue(7)

        self.verticalLayout_46.addWidget(self.spinBox_1)


        self.verticalLayout_45.addWidget(self.pillarRanksWidget)


        self.verticalLayout_44.addWidget(self.pillarRanksGB)


        self.horizontalLayout_31.addWidget(self.ranksWidget)

        self.processingPipelineGB = QGroupBox(self.pipelinesGB)
        self.processingPipelineGB.setObjectName(u"processingPipelineGB")
        self.processingPipelineGB.setFont(font4)
        self.processingPipelineGB.setFlat(True)
        self.horizontalLayout_32 = QHBoxLayout(self.processingPipelineGB)
        self.horizontalLayout_32.setSpacing(2)
        self.horizontalLayout_32.setObjectName(u"horizontalLayout_32")
        self.horizontalLayout_32.setContentsMargins(1, 25, 1, 1)
        self.inputPhaseGB = QGroupBox(self.processingPipelineGB)
        self.inputPhaseGB.setObjectName(u"inputPhaseGB")
        self.inputPhaseGB.setFlat(True)
        self.verticalLayout_47 = QVBoxLayout(self.inputPhaseGB)
        self.verticalLayout_47.setObjectName(u"verticalLayout_47")
        self.verticalLayout_47.setContentsMargins(-1, 20, -1, -1)
        self.inputPhaseStackedWidget = QStackedWidget(self.inputPhaseGB)
        self.inputPhaseStackedWidget.setObjectName(u"inputPhaseStackedWidget")
        self.inputPhaseStackedWidget.setFrameShape(QFrame.NoFrame)
        self.inputPhaseStackedWidget.setMidLineWidth(1)
        self.inputPhasePage01 = QWidget()
        self.inputPhasePage01.setObjectName(u"inputPhasePage01")
        self.verticalLayout_48 = QVBoxLayout(self.inputPhasePage01)
        self.verticalLayout_48.setObjectName(u"verticalLayout_48")
        self.inputPhasePage01_List = QListWidget(self.inputPhasePage01)
        QListWidgetItem(self.inputPhasePage01_List)
        font5 = QFont()
        font5.setPointSize(12)
        font5.setItalic(True)
        __qlistwidgetitem = QListWidgetItem(self.inputPhasePage01_List)
        __qlistwidgetitem.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem.setFont(font5);
        __qlistwidgetitem.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem1 = QListWidgetItem(self.inputPhasePage01_List)
        __qlistwidgetitem1.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem1.setFont(font5);
        __qlistwidgetitem1.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem2 = QListWidgetItem(self.inputPhasePage01_List)
        __qlistwidgetitem2.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem2.setFont(font5);
        __qlistwidgetitem2.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem3 = QListWidgetItem(self.inputPhasePage01_List)
        __qlistwidgetitem3.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem3.setFont(font5);
        __qlistwidgetitem3.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem4 = QListWidgetItem(self.inputPhasePage01_List)
        __qlistwidgetitem4.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem4.setFont(font5);
        __qlistwidgetitem4.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem5 = QListWidgetItem(self.inputPhasePage01_List)
        __qlistwidgetitem5.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem5.setFont(font5);
        __qlistwidgetitem5.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem6 = QListWidgetItem(self.inputPhasePage01_List)
        __qlistwidgetitem6.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem6.setFont(font5);
        __qlistwidgetitem6.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        self.inputPhasePage01_List.setObjectName(u"inputPhasePage01_List")
        font6 = QFont()
        font6.setFamilies([u"JetBrains Mono"])
        font6.setPointSize(11)
        font6.setBold(False)
        self.inputPhasePage01_List.setFont(font6)
        self.inputPhasePage01_List.setSpacing(8)

        self.verticalLayout_48.addWidget(self.inputPhasePage01_List)

        self.inputPhaseStackedWidget.addWidget(self.inputPhasePage01)
        self.inputPhasePage02 = QWidget()
        self.inputPhasePage02.setObjectName(u"inputPhasePage02")
        self.horizontalLayout_33 = QHBoxLayout(self.inputPhasePage02)
        self.horizontalLayout_33.setObjectName(u"horizontalLayout_33")
        self.inputPhasePage02_List = QListWidget(self.inputPhasePage02)
        QListWidgetItem(self.inputPhasePage02_List)
        __qlistwidgetitem7 = QListWidgetItem(self.inputPhasePage02_List)
        __qlistwidgetitem7.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem7.setFont(font5);
        __qlistwidgetitem7.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem8 = QListWidgetItem(self.inputPhasePage02_List)
        __qlistwidgetitem8.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem8.setFont(font5);
        __qlistwidgetitem8.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem9 = QListWidgetItem(self.inputPhasePage02_List)
        __qlistwidgetitem9.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem9.setFont(font5);
        __qlistwidgetitem9.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem10 = QListWidgetItem(self.inputPhasePage02_List)
        __qlistwidgetitem10.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem10.setFont(font5);
        __qlistwidgetitem10.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem11 = QListWidgetItem(self.inputPhasePage02_List)
        __qlistwidgetitem11.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem11.setFont(font5);
        __qlistwidgetitem11.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem12 = QListWidgetItem(self.inputPhasePage02_List)
        __qlistwidgetitem12.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem12.setFont(font5);
        __qlistwidgetitem12.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem13 = QListWidgetItem(self.inputPhasePage02_List)
        __qlistwidgetitem13.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem13.setFont(font5);
        __qlistwidgetitem13.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        self.inputPhasePage02_List.setObjectName(u"inputPhasePage02_List")
        self.inputPhasePage02_List.setFont(font6)
        self.inputPhasePage02_List.setSpacing(8)

        self.horizontalLayout_33.addWidget(self.inputPhasePage02_List)

        self.inputPhaseStackedWidget.addWidget(self.inputPhasePage02)
        self.inputPhasePage03 = QWidget()
        self.inputPhasePage03.setObjectName(u"inputPhasePage03")
        self.verticalLayout_49 = QVBoxLayout(self.inputPhasePage03)
        self.verticalLayout_49.setObjectName(u"verticalLayout_49")
        self.inputPhasePage03_List = QListWidget(self.inputPhasePage03)
        QListWidgetItem(self.inputPhasePage03_List)
        __qlistwidgetitem14 = QListWidgetItem(self.inputPhasePage03_List)
        __qlistwidgetitem14.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem14.setFont(font5);
        __qlistwidgetitem14.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem15 = QListWidgetItem(self.inputPhasePage03_List)
        __qlistwidgetitem15.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem15.setFont(font5);
        __qlistwidgetitem15.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem16 = QListWidgetItem(self.inputPhasePage03_List)
        __qlistwidgetitem16.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem16.setFont(font5);
        __qlistwidgetitem16.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem17 = QListWidgetItem(self.inputPhasePage03_List)
        __qlistwidgetitem17.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem17.setFont(font5);
        __qlistwidgetitem17.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem18 = QListWidgetItem(self.inputPhasePage03_List)
        __qlistwidgetitem18.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem18.setFont(font5);
        __qlistwidgetitem18.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem19 = QListWidgetItem(self.inputPhasePage03_List)
        __qlistwidgetitem19.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem19.setFont(font5);
        __qlistwidgetitem19.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem20 = QListWidgetItem(self.inputPhasePage03_List)
        __qlistwidgetitem20.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem20.setFont(font5);
        __qlistwidgetitem20.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        self.inputPhasePage03_List.setObjectName(u"inputPhasePage03_List")
        self.inputPhasePage03_List.setFont(font6)
        self.inputPhasePage03_List.setSpacing(8)

        self.verticalLayout_49.addWidget(self.inputPhasePage03_List)

        self.inputPhaseStackedWidget.addWidget(self.inputPhasePage03)

        self.verticalLayout_47.addWidget(self.inputPhaseStackedWidget)


        self.horizontalLayout_32.addWidget(self.inputPhaseGB)

        self.inceptionPL_SensorWidget = QWidget(self.processingPipelineGB)
        self.inceptionPL_SensorWidget.setObjectName(u"inceptionPL_SensorWidget")
        self.verticalLayout_50 = QVBoxLayout(self.inceptionPL_SensorWidget)
        self.verticalLayout_50.setObjectName(u"verticalLayout_50")
        self.verticalSpacer_11 = QSpacerItem(20, 50, QSizePolicy.Policy.Minimum, QSizePolicy.Policy.Fixed)

        self.verticalLayout_50.addItem(self.verticalSpacer_11)

        self.inception_sensor_8 = QLabel(self.inceptionPL_SensorWidget)
        self.inception_sensor_8.setObjectName(u"inception_sensor_8")
        self.inception_sensor_8.setStyleSheet(u"background-color: black;\n"
"border-radius: 10px;\n"
"min-width: 20px;\n"
"min-height: 20px;\n"
"")

        self.verticalLayout_50.addWidget(self.inception_sensor_8)

        self.inception_sensor_9 = QLabel(self.inceptionPL_SensorWidget)
        self.inception_sensor_9.setObjectName(u"inception_sensor_9")
        self.inception_sensor_9.setStyleSheet(u"background-color: black;\n"
"border-radius: 10px;\n"
"min-width: 20px;\n"
"min-height: 20px;\n"
"")

        self.verticalLayout_50.addWidget(self.inception_sensor_9)

        self.inception_sensor_10 = QLabel(self.inceptionPL_SensorWidget)
        self.inception_sensor_10.setObjectName(u"inception_sensor_10")
        self.inception_sensor_10.setStyleSheet(u"background-color: black;\n"
"border-radius: 10px;\n"
"min-width: 20px;\n"
"min-height: 20px;\n"
"")

        self.verticalLayout_50.addWidget(self.inception_sensor_10)

        self.inception_sensor_11 = QLabel(self.inceptionPL_SensorWidget)
        self.inception_sensor_11.setObjectName(u"inception_sensor_11")
        self.inception_sensor_11.setStyleSheet(u"background-color: black;\n"
"border-radius: 10px;\n"
"min-width: 20px;\n"
"min-height: 20px;\n"
"")

        self.verticalLayout_50.addWidget(self.inception_sensor_11)

        self.inception_sensor_12 = QLabel(self.inceptionPL_SensorWidget)
        self.inception_sensor_12.setObjectName(u"inception_sensor_12")
        self.inception_sensor_12.setStyleSheet(u"background-color: black;\n"
"border-radius: 10px;\n"
"min-width: 20px;\n"
"min-height: 20px;\n"
"")

        self.verticalLayout_50.addWidget(self.inception_sensor_12)

        self.inception_sensor_13 = QLabel(self.inceptionPL_SensorWidget)
        self.inception_sensor_13.setObjectName(u"inception_sensor_13")
        self.inception_sensor_13.setStyleSheet(u"background-color: black;\n"
"border-radius: 10px;\n"
"min-width: 20px;\n"
"min-height: 20px;\n"
"")

        self.verticalLayout_50.addWidget(self.inception_sensor_13)

        self.inception_sensor_14 = QLabel(self.inceptionPL_SensorWidget)
        self.inception_sensor_14.setObjectName(u"inception_sensor_14")
        self.inception_sensor_14.setStyleSheet(u"background-color: black;\n"
"border-radius: 10px;\n"
"min-width: 20px;\n"
"min-height: 20px;\n"
"")

        self.verticalLayout_50.addWidget(self.inception_sensor_14)

        self.verticalSpacer_12 = QSpacerItem(20, 35, QSizePolicy.Policy.Minimum, QSizePolicy.Policy.Fixed)

        self.verticalLayout_50.addItem(self.verticalSpacer_12)


        self.horizontalLayout_32.addWidget(self.inceptionPL_SensorWidget)

        self.identityPhaseGB = QGroupBox(self.processingPipelineGB)
        self.identityPhaseGB.setObjectName(u"identityPhaseGB")
        self.identityPhaseGB.setFlat(True)
        self.verticalLayout_51 = QVBoxLayout(self.identityPhaseGB)
        self.verticalLayout_51.setObjectName(u"verticalLayout_51")
        self.verticalLayout_51.setContentsMargins(-1, 20, -1, -1)
        self.identityPhaseStackedWidget = QStackedWidget(self.identityPhaseGB)
        self.identityPhaseStackedWidget.setObjectName(u"identityPhaseStackedWidget")
        self.identityPhaseStackedWidget.setFrameShape(QFrame.NoFrame)
        self.identityPhaseStackedWidget.setMidLineWidth(1)
        self.identityPhasePage01 = QWidget()
        self.identityPhasePage01.setObjectName(u"identityPhasePage01")
        self.verticalLayout_52 = QVBoxLayout(self.identityPhasePage01)
        self.verticalLayout_52.setObjectName(u"verticalLayout_52")
        self.identityPhasePage01_List = QListWidget(self.identityPhasePage01)
        QListWidgetItem(self.identityPhasePage01_List)
        __qlistwidgetitem21 = QListWidgetItem(self.identityPhasePage01_List)
        __qlistwidgetitem21.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem21.setFont(font5);
        __qlistwidgetitem21.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem22 = QListWidgetItem(self.identityPhasePage01_List)
        __qlistwidgetitem22.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem22.setFont(font5);
        __qlistwidgetitem22.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem23 = QListWidgetItem(self.identityPhasePage01_List)
        __qlistwidgetitem23.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem23.setFont(font5);
        __qlistwidgetitem23.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem24 = QListWidgetItem(self.identityPhasePage01_List)
        __qlistwidgetitem24.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem24.setFont(font5);
        __qlistwidgetitem24.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem25 = QListWidgetItem(self.identityPhasePage01_List)
        __qlistwidgetitem25.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem25.setFont(font5);
        __qlistwidgetitem25.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem26 = QListWidgetItem(self.identityPhasePage01_List)
        __qlistwidgetitem26.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem26.setFont(font5);
        __qlistwidgetitem26.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem27 = QListWidgetItem(self.identityPhasePage01_List)
        __qlistwidgetitem27.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem27.setFont(font5);
        __qlistwidgetitem27.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        self.identityPhasePage01_List.setObjectName(u"identityPhasePage01_List")
        self.identityPhasePage01_List.setFont(font6)
        self.identityPhasePage01_List.setSpacing(8)

        self.verticalLayout_52.addWidget(self.identityPhasePage01_List)

        self.identityPhaseStackedWidget.addWidget(self.identityPhasePage01)
        self.identityPhasePage02 = QWidget()
        self.identityPhasePage02.setObjectName(u"identityPhasePage02")
        self.horizontalLayout_34 = QHBoxLayout(self.identityPhasePage02)
        self.horizontalLayout_34.setObjectName(u"horizontalLayout_34")
        self.identityPhasePage02_List = QListWidget(self.identityPhasePage02)
        QListWidgetItem(self.identityPhasePage02_List)
        __qlistwidgetitem28 = QListWidgetItem(self.identityPhasePage02_List)
        __qlistwidgetitem28.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem28.setFont(font5);
        __qlistwidgetitem28.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem29 = QListWidgetItem(self.identityPhasePage02_List)
        __qlistwidgetitem29.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem29.setFont(font5);
        __qlistwidgetitem29.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem30 = QListWidgetItem(self.identityPhasePage02_List)
        __qlistwidgetitem30.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem30.setFont(font5);
        __qlistwidgetitem30.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem31 = QListWidgetItem(self.identityPhasePage02_List)
        __qlistwidgetitem31.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem31.setFont(font5);
        __qlistwidgetitem31.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem32 = QListWidgetItem(self.identityPhasePage02_List)
        __qlistwidgetitem32.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem32.setFont(font5);
        __qlistwidgetitem32.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem33 = QListWidgetItem(self.identityPhasePage02_List)
        __qlistwidgetitem33.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem33.setFont(font5);
        __qlistwidgetitem33.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem34 = QListWidgetItem(self.identityPhasePage02_List)
        __qlistwidgetitem34.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem34.setFont(font5);
        __qlistwidgetitem34.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        self.identityPhasePage02_List.setObjectName(u"identityPhasePage02_List")
        self.identityPhasePage02_List.setFont(font6)
        self.identityPhasePage02_List.setSpacing(8)

        self.horizontalLayout_34.addWidget(self.identityPhasePage02_List)

        self.identityPhaseStackedWidget.addWidget(self.identityPhasePage02)
        self.identityPhasePage03 = QWidget()
        self.identityPhasePage03.setObjectName(u"identityPhasePage03")
        self.verticalLayout_53 = QVBoxLayout(self.identityPhasePage03)
        self.verticalLayout_53.setObjectName(u"verticalLayout_53")
        self.identityPhasePage03_List = QListWidget(self.identityPhasePage03)
        QListWidgetItem(self.identityPhasePage03_List)
        __qlistwidgetitem35 = QListWidgetItem(self.identityPhasePage03_List)
        __qlistwidgetitem35.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem35.setFont(font5);
        __qlistwidgetitem35.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem36 = QListWidgetItem(self.identityPhasePage03_List)
        __qlistwidgetitem36.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem36.setFont(font5);
        __qlistwidgetitem36.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem37 = QListWidgetItem(self.identityPhasePage03_List)
        __qlistwidgetitem37.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem37.setFont(font5);
        __qlistwidgetitem37.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem38 = QListWidgetItem(self.identityPhasePage03_List)
        __qlistwidgetitem38.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem38.setFont(font5);
        __qlistwidgetitem38.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem39 = QListWidgetItem(self.identityPhasePage03_List)
        __qlistwidgetitem39.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem39.setFont(font5);
        __qlistwidgetitem39.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem40 = QListWidgetItem(self.identityPhasePage03_List)
        __qlistwidgetitem40.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem40.setFont(font5);
        __qlistwidgetitem40.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem41 = QListWidgetItem(self.identityPhasePage03_List)
        __qlistwidgetitem41.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem41.setFont(font5);
        __qlistwidgetitem41.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        self.identityPhasePage03_List.setObjectName(u"identityPhasePage03_List")
        self.identityPhasePage03_List.setFont(font6)
        self.identityPhasePage03_List.setSpacing(8)

        self.verticalLayout_53.addWidget(self.identityPhasePage03_List)

        self.identityPhaseStackedWidget.addWidget(self.identityPhasePage03)

        self.verticalLayout_51.addWidget(self.identityPhaseStackedWidget)


        self.horizontalLayout_32.addWidget(self.identityPhaseGB)

        self.inceptionPL_SensorWidget_2 = QWidget(self.processingPipelineGB)
        self.inceptionPL_SensorWidget_2.setObjectName(u"inceptionPL_SensorWidget_2")
        self.verticalLayout_54 = QVBoxLayout(self.inceptionPL_SensorWidget_2)
        self.verticalLayout_54.setObjectName(u"verticalLayout_54")
        self.verticalSpacer_13 = QSpacerItem(20, 50, QSizePolicy.Policy.Minimum, QSizePolicy.Policy.Fixed)

        self.verticalLayout_54.addItem(self.verticalSpacer_13)

        self.inception_sensor_15 = QLabel(self.inceptionPL_SensorWidget_2)
        self.inception_sensor_15.setObjectName(u"inception_sensor_15")
        self.inception_sensor_15.setStyleSheet(u"background-color: black;\n"
"border-radius: 10px;\n"
"min-width: 20px;\n"
"min-height: 20px;\n"
"")

        self.verticalLayout_54.addWidget(self.inception_sensor_15)

        self.inception_sensor_16 = QLabel(self.inceptionPL_SensorWidget_2)
        self.inception_sensor_16.setObjectName(u"inception_sensor_16")
        self.inception_sensor_16.setStyleSheet(u"background-color: black;\n"
"border-radius: 10px;\n"
"min-width: 20px;\n"
"min-height: 20px;\n"
"")

        self.verticalLayout_54.addWidget(self.inception_sensor_16)

        self.inception_sensor_17 = QLabel(self.inceptionPL_SensorWidget_2)
        self.inception_sensor_17.setObjectName(u"inception_sensor_17")
        self.inception_sensor_17.setStyleSheet(u"background-color: black;\n"
"border-radius: 10px;\n"
"min-width: 20px;\n"
"min-height: 20px;\n"
"")

        self.verticalLayout_54.addWidget(self.inception_sensor_17)

        self.inception_sensor_18 = QLabel(self.inceptionPL_SensorWidget_2)
        self.inception_sensor_18.setObjectName(u"inception_sensor_18")
        self.inception_sensor_18.setStyleSheet(u"background-color: black;\n"
"border-radius: 10px;\n"
"min-width: 20px;\n"
"min-height: 20px;\n"
"")

        self.verticalLayout_54.addWidget(self.inception_sensor_18)

        self.inception_sensor_19 = QLabel(self.inceptionPL_SensorWidget_2)
        self.inception_sensor_19.setObjectName(u"inception_sensor_19")
        self.inception_sensor_19.setStyleSheet(u"background-color: black;\n"
"border-radius: 10px;\n"
"min-width: 20px;\n"
"min-height: 20px;\n"
"")

        self.verticalLayout_54.addWidget(self.inception_sensor_19)

        self.inception_sensor_20 = QLabel(self.inceptionPL_SensorWidget_2)
        self.inception_sensor_20.setObjectName(u"inception_sensor_20")
        self.inception_sensor_20.setStyleSheet(u"background-color: black;\n"
"border-radius: 10px;\n"
"min-width: 20px;\n"
"min-height: 20px;\n"
"")

        self.verticalLayout_54.addWidget(self.inception_sensor_20)

        self.inception_sensor_21 = QLabel(self.inceptionPL_SensorWidget_2)
        self.inception_sensor_21.setObjectName(u"inception_sensor_21")
        self.inception_sensor_21.setStyleSheet(u"background-color: black;\n"
"border-radius: 10px;\n"
"min-width: 20px;\n"
"min-height: 20px;\n"
"")

        self.verticalLayout_54.addWidget(self.inception_sensor_21)

        self.verticalSpacer_14 = QSpacerItem(20, 35, QSizePolicy.Policy.Minimum, QSizePolicy.Policy.Fixed)

        self.verticalLayout_54.addItem(self.verticalSpacer_14)


        self.horizontalLayout_32.addWidget(self.inceptionPL_SensorWidget_2)

        self.inceptionPhaseGP = QGroupBox(self.processingPipelineGB)
        self.inceptionPhaseGP.setObjectName(u"inceptionPhaseGP")
        self.inceptionPhaseGP.setFlat(True)
        self.verticalLayout_55 = QVBoxLayout(self.inceptionPhaseGP)
        self.verticalLayout_55.setObjectName(u"verticalLayout_55")
        self.verticalLayout_55.setContentsMargins(-1, 20, -1, -1)
        self.inceptionPhaseStackedWidget = QStackedWidget(self.inceptionPhaseGP)
        self.inceptionPhaseStackedWidget.setObjectName(u"inceptionPhaseStackedWidget")
        self.inceptionPhaseStackedWidget.setFrameShape(QFrame.NoFrame)
        self.inceptionPhaseStackedWidget.setMidLineWidth(1)
        self.inceptionPhasePage01 = QWidget()
        self.inceptionPhasePage01.setObjectName(u"inceptionPhasePage01")
        self.verticalLayout_56 = QVBoxLayout(self.inceptionPhasePage01)
        self.verticalLayout_56.setObjectName(u"verticalLayout_56")
        self.inceptionPhasePage01_List = QListWidget(self.inceptionPhasePage01)
        QListWidgetItem(self.inceptionPhasePage01_List)
        __qlistwidgetitem42 = QListWidgetItem(self.inceptionPhasePage01_List)
        __qlistwidgetitem42.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem42.setFont(font5);
        __qlistwidgetitem42.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem43 = QListWidgetItem(self.inceptionPhasePage01_List)
        __qlistwidgetitem43.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem43.setFont(font5);
        __qlistwidgetitem43.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem44 = QListWidgetItem(self.inceptionPhasePage01_List)
        __qlistwidgetitem44.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem44.setFont(font5);
        __qlistwidgetitem44.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem45 = QListWidgetItem(self.inceptionPhasePage01_List)
        __qlistwidgetitem45.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem45.setFont(font5);
        __qlistwidgetitem45.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem46 = QListWidgetItem(self.inceptionPhasePage01_List)
        __qlistwidgetitem46.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem46.setFont(font5);
        __qlistwidgetitem46.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem47 = QListWidgetItem(self.inceptionPhasePage01_List)
        __qlistwidgetitem47.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem47.setFont(font5);
        __qlistwidgetitem47.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem48 = QListWidgetItem(self.inceptionPhasePage01_List)
        __qlistwidgetitem48.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem48.setFont(font5);
        __qlistwidgetitem48.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        self.inceptionPhasePage01_List.setObjectName(u"inceptionPhasePage01_List")
        self.inceptionPhasePage01_List.setFont(font6)
        self.inceptionPhasePage01_List.setSpacing(8)
        self.inceptionPhasePage01_List.setModelColumn(0)

        self.verticalLayout_56.addWidget(self.inceptionPhasePage01_List)

        self.inceptionPhaseStackedWidget.addWidget(self.inceptionPhasePage01)
        self.inceptionPhasePage02 = QWidget()
        self.inceptionPhasePage02.setObjectName(u"inceptionPhasePage02")
        self.horizontalLayout_35 = QHBoxLayout(self.inceptionPhasePage02)
        self.horizontalLayout_35.setObjectName(u"horizontalLayout_35")
        self.inceptionPhasePage02_List = QListWidget(self.inceptionPhasePage02)
        QListWidgetItem(self.inceptionPhasePage02_List)
        __qlistwidgetitem49 = QListWidgetItem(self.inceptionPhasePage02_List)
        __qlistwidgetitem49.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem49.setFont(font5);
        __qlistwidgetitem49.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem50 = QListWidgetItem(self.inceptionPhasePage02_List)
        __qlistwidgetitem50.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem50.setFont(font5);
        __qlistwidgetitem50.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem51 = QListWidgetItem(self.inceptionPhasePage02_List)
        __qlistwidgetitem51.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem51.setFont(font5);
        __qlistwidgetitem51.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem52 = QListWidgetItem(self.inceptionPhasePage02_List)
        __qlistwidgetitem52.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem52.setFont(font5);
        __qlistwidgetitem52.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem53 = QListWidgetItem(self.inceptionPhasePage02_List)
        __qlistwidgetitem53.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem53.setFont(font5);
        __qlistwidgetitem53.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem54 = QListWidgetItem(self.inceptionPhasePage02_List)
        __qlistwidgetitem54.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem54.setFont(font5);
        __qlistwidgetitem54.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem55 = QListWidgetItem(self.inceptionPhasePage02_List)
        __qlistwidgetitem55.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem55.setFont(font5);
        __qlistwidgetitem55.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        self.inceptionPhasePage02_List.setObjectName(u"inceptionPhasePage02_List")
        self.inceptionPhasePage02_List.setFont(font6)
        self.inceptionPhasePage02_List.setSpacing(8)

        self.horizontalLayout_35.addWidget(self.inceptionPhasePage02_List)

        self.inceptionPhaseStackedWidget.addWidget(self.inceptionPhasePage02)
        self.inceptionPhasePage03 = QWidget()
        self.inceptionPhasePage03.setObjectName(u"inceptionPhasePage03")
        self.verticalLayout_57 = QVBoxLayout(self.inceptionPhasePage03)
        self.verticalLayout_57.setObjectName(u"verticalLayout_57")
        self.inceptionPhasePage03_List = QListWidget(self.inceptionPhasePage03)
        QListWidgetItem(self.inceptionPhasePage03_List)
        __qlistwidgetitem56 = QListWidgetItem(self.inceptionPhasePage03_List)
        __qlistwidgetitem56.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem56.setFont(font5);
        __qlistwidgetitem56.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem57 = QListWidgetItem(self.inceptionPhasePage03_List)
        __qlistwidgetitem57.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem57.setFont(font5);
        __qlistwidgetitem57.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem58 = QListWidgetItem(self.inceptionPhasePage03_List)
        __qlistwidgetitem58.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem58.setFont(font5);
        __qlistwidgetitem58.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem59 = QListWidgetItem(self.inceptionPhasePage03_List)
        __qlistwidgetitem59.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem59.setFont(font5);
        __qlistwidgetitem59.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem60 = QListWidgetItem(self.inceptionPhasePage03_List)
        __qlistwidgetitem60.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem60.setFont(font5);
        __qlistwidgetitem60.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem61 = QListWidgetItem(self.inceptionPhasePage03_List)
        __qlistwidgetitem61.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem61.setFont(font5);
        __qlistwidgetitem61.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        __qlistwidgetitem62 = QListWidgetItem(self.inceptionPhasePage03_List)
        __qlistwidgetitem62.setTextAlignment(Qt.AlignCenter);
        __qlistwidgetitem62.setFont(font5);
        __qlistwidgetitem62.setFlags(Qt.ItemIsSelectable|Qt.ItemIsDragEnabled|Qt.ItemIsDropEnabled|Qt.ItemIsUserCheckable|Qt.ItemIsEnabled);
        self.inceptionPhasePage03_List.setObjectName(u"inceptionPhasePage03_List")
        self.inceptionPhasePage03_List.setFont(font6)
        self.inceptionPhasePage03_List.setSpacing(8)

        self.verticalLayout_57.addWidget(self.inceptionPhasePage03_List)

        self.inceptionPhaseStackedWidget.addWidget(self.inceptionPhasePage03)

        self.verticalLayout_55.addWidget(self.inceptionPhaseStackedWidget)


        self.horizontalLayout_32.addWidget(self.inceptionPhaseGP)

        self.inceptionPL_SensorWidget_3 = QWidget(self.processingPipelineGB)
        self.inceptionPL_SensorWidget_3.setObjectName(u"inceptionPL_SensorWidget_3")
        self.verticalLayout_58 = QVBoxLayout(self.inceptionPL_SensorWidget_3)
        self.verticalLayout_58.setObjectName(u"verticalLayout_58")
        self.verticalSpacer_15 = QSpacerItem(20, 50, QSizePolicy.Policy.Minimum, QSizePolicy.Policy.Fixed)

        self.verticalLayout_58.addItem(self.verticalSpacer_15)

        self.inception_sensor_22 = QLabel(self.inceptionPL_SensorWidget_3)
        self.inception_sensor_22.setObjectName(u"inception_sensor_22")
        self.inception_sensor_22.setStyleSheet(u"background-color: black;\n"
"border-radius: 10px;\n"
"min-width: 20px;\n"
"min-height: 20px;\n"
"")

        self.verticalLayout_58.addWidget(self.inception_sensor_22)

        self.inception_sensor_23 = QLabel(self.inceptionPL_SensorWidget_3)
        self.inception_sensor_23.setObjectName(u"inception_sensor_23")
        self.inception_sensor_23.setStyleSheet(u"background-color: black;\n"
"border-radius: 10px;\n"
"min-width: 20px;\n"
"min-height: 20px;\n"
"")

        self.verticalLayout_58.addWidget(self.inception_sensor_23)

        self.inception_sensor_24 = QLabel(self.inceptionPL_SensorWidget_3)
        self.inception_sensor_24.setObjectName(u"inception_sensor_24")
        self.inception_sensor_24.setStyleSheet(u"background-color: black;\n"
"border-radius: 10px;\n"
"min-width: 20px;\n"
"min-height: 20px;\n"
"")

        self.verticalLayout_58.addWidget(self.inception_sensor_24)

        self.inception_sensor_25 = QLabel(self.inceptionPL_SensorWidget_3)
        self.inception_sensor_25.setObjectName(u"inception_sensor_25")
        self.inception_sensor_25.setStyleSheet(u"background-color: black;\n"
"border-radius: 10px;\n"
"min-width: 20px;\n"
"min-height: 20px;\n"
"")

        self.verticalLayout_58.addWidget(self.inception_sensor_25)

        self.inception_sensor_26 = QLabel(self.inceptionPL_SensorWidget_3)
        self.inception_sensor_26.setObjectName(u"inception_sensor_26")
        self.inception_sensor_26.setStyleSheet(u"background-color: black;\n"
"border-radius: 10px;\n"
"min-width: 20px;\n"
"min-height: 20px;\n"
"")

        self.verticalLayout_58.addWidget(self.inception_sensor_26)

        self.inception_sensor_27 = QLabel(self.inceptionPL_SensorWidget_3)
        self.inception_sensor_27.setObjectName(u"inception_sensor_27")
        self.inception_sensor_27.setStyleSheet(u"background-color: black;\n"
"border-radius: 10px;\n"
"min-width: 20px;\n"
"min-height: 20px;\n"
"")

        self.verticalLayout_58.addWidget(self.inception_sensor_27)

        self.inception_sensor_28 = QLabel(self.inceptionPL_SensorWidget_3)
        self.inception_sensor_28.setObjectName(u"inception_sensor_28")
        self.inception_sensor_28.setStyleSheet(u"background-color: black;\n"
"border-radius: 10px;\n"
"min-width: 20px;\n"
"min-height: 20px;\n"
"")

        self.verticalLayout_58.addWidget(self.inception_sensor_28)

        self.verticalSpacer_16 = QSpacerItem(20, 35, QSizePolicy.Policy.Minimum, QSizePolicy.Policy.Fixed)

        self.verticalLayout_58.addItem(self.verticalSpacer_16)


        self.horizontalLayout_32.addWidget(self.inceptionPL_SensorWidget_3)

        self.horizontalLayout_32.setStretch(0, 33)
        self.horizontalLayout_32.setStretch(2, 33)
        self.horizontalLayout_32.setStretch(4, 33)

        self.horizontalLayout_31.addWidget(self.processingPipelineGB)

        self.horizontalLayout_31.setStretch(1, 70)

        self.verticalLayout_36.addWidget(self.pipelinesGB)

        self.verticalLayout_36.setStretch(0, 25)
        self.verticalLayout_36.setStretch(1, 25)
        self.verticalLayout_36.setStretch(2, 50)

        self.horizontalLayout_22.addWidget(self.engineCoreFrame)

        self.finalOutputPromptFrame = QFrame(self.controllerFrame_2)
        self.finalOutputPromptFrame.setObjectName(u"finalOutputPromptFrame")
        self.finalOutputPromptFrame.setFrameShape(QFrame.NoFrame)
        self.verticalLayout_59 = QVBoxLayout(self.finalOutputPromptFrame)
        self.verticalLayout_59.setObjectName(u"verticalLayout_59")
        self.label = QLabel(self.finalOutputPromptFrame)
        self.label.setObjectName(u"label")
        self.label.setFont(font)

        self.verticalLayout_59.addWidget(self.label)

        self.outputManifoldFrame = QFrame(self.finalOutputPromptFrame)
        self.outputManifoldFrame.setObjectName(u"outputManifoldFrame")
        self.outputManifoldFrame.setFrameShape(QFrame.NoFrame)
        self.verticalLayout_60 = QVBoxLayout(self.outputManifoldFrame)
        self.verticalLayout_60.setObjectName(u"verticalLayout_60")
        self.outputRank1Label = QLabel(self.outputManifoldFrame)
        self.outputRank1Label.setObjectName(u"outputRank1Label")
        self.outputRank1Label.setFont(font)

        self.verticalLayout_60.addWidget(self.outputRank1Label)

        self.rank1TE = QTextEdit(self.outputManifoldFrame)
        self.rank1TE.setObjectName(u"rank1TE")
        self.rank1TE.setReadOnly(True)

        self.verticalLayout_60.addWidget(self.rank1TE)

        self.outputRank2Label = QLabel(self.outputManifoldFrame)
        self.outputRank2Label.setObjectName(u"outputRank2Label")
        self.outputRank2Label.setFont(font)

        self.verticalLayout_60.addWidget(self.outputRank2Label)

        self.rank2TE = QTextEdit(self.outputManifoldFrame)
        self.rank2TE.setObjectName(u"rank2TE")
        self.rank2TE.setReadOnly(True)

        self.verticalLayout_60.addWidget(self.rank2TE)

        self.outputRank3Label = QLabel(self.outputManifoldFrame)
        self.outputRank3Label.setObjectName(u"outputRank3Label")
        self.outputRank3Label.setFont(font)

        self.verticalLayout_60.addWidget(self.outputRank3Label)

        self.rank3TE = QTextEdit(self.outputManifoldFrame)
        self.rank3TE.setObjectName(u"rank3TE")
        self.rank3TE.setReadOnly(True)

        self.verticalLayout_60.addWidget(self.rank3TE)

        self.outputRank4Label = QLabel(self.outputManifoldFrame)
        self.outputRank4Label.setObjectName(u"outputRank4Label")
        self.outputRank4Label.setFont(font)

        self.verticalLayout_60.addWidget(self.outputRank4Label)

        self.rank4TE = QTextEdit(self.outputManifoldFrame)
        self.rank4TE.setObjectName(u"rank4TE")
        self.rank4TE.setReadOnly(True)

        self.verticalLayout_60.addWidget(self.rank4TE)

        self.outputRank5Label = QLabel(self.outputManifoldFrame)
        self.outputRank5Label.setObjectName(u"outputRank5Label")
        self.outputRank5Label.setFont(font)

        self.verticalLayout_60.addWidget(self.outputRank5Label)

        self.rank5TE = QTextEdit(self.outputManifoldFrame)
        self.rank5TE.setObjectName(u"rank5TE")
        self.rank5TE.setReadOnly(True)

        self.verticalLayout_60.addWidget(self.rank5TE)

        self.outputRank6Label = QLabel(self.outputManifoldFrame)
        self.outputRank6Label.setObjectName(u"outputRank6Label")
        self.outputRank6Label.setFont(font)

        self.verticalLayout_60.addWidget(self.outputRank6Label)

        self.rank6TE = QTextEdit(self.outputManifoldFrame)
        self.rank6TE.setObjectName(u"rank6TE")
        self.rank6TE.setReadOnly(True)

        self.verticalLayout_60.addWidget(self.rank6TE)

        self.outputRank7Label = QLabel(self.outputManifoldFrame)
        self.outputRank7Label.setObjectName(u"outputRank7Label")
        self.outputRank7Label.setFont(font)

        self.verticalLayout_60.addWidget(self.outputRank7Label)

        self.rank7TE = QTextEdit(self.outputManifoldFrame)
        self.rank7TE.setObjectName(u"rank7TE")
        self.rank7TE.setReadOnly(True)

        self.verticalLayout_60.addWidget(self.rank7TE)


        self.verticalLayout_59.addWidget(self.outputManifoldFrame)


        self.horizontalLayout_22.addWidget(self.finalOutputPromptFrame)

        self.horizontalLayout_22.setStretch(0, 25)
        self.horizontalLayout_22.setStretch(1, 50)
        self.horizontalLayout_22.setStretch(2, 25)

        self.verticalLayout_61.addWidget(self.controllerFrame_2)

        self.mainStackedWidget.addWidget(self.mainEnginePage)
        self.auditsPage = QWidget()
        self.auditsPage.setObjectName(u"auditsPage")
        self.verticalLayout_16 = QVBoxLayout(self.auditsPage)
        self.verticalLayout_16.setObjectName(u"verticalLayout_16")
        self.auditFrame = QFrame(self.auditsPage)
        self.auditFrame.setObjectName(u"auditFrame")
        self.auditFrame.setFrameShape(QFrame.NoFrame)
        self.gridLayout_3 = QGridLayout(self.auditFrame)
        self.gridLayout_3.setObjectName(u"gridLayout_3")
        self.groupBox_4 = QGroupBox(self.auditFrame)
        self.groupBox_4.setObjectName(u"groupBox_4")
        self.horizontalLayout_17 = QHBoxLayout(self.groupBox_4)
        self.horizontalLayout_17.setObjectName(u"horizontalLayout_17")
        self.inputPhaseGB_2 = QGroupBox(self.groupBox_4)
        self.inputPhaseGB_2.setObjectName(u"inputPhaseGB_2")
        self.verticalLayout_75 = QVBoxLayout(self.inputPhaseGB_2)
        self.verticalLayout_75.setObjectName(u"verticalLayout_75")
        self.auditInputPhaseLabel_2 = QLabel(self.inputPhaseGB_2)
        self.auditInputPhaseLabel_2.setObjectName(u"auditInputPhaseLabel_2")

        self.verticalLayout_75.addWidget(self.auditInputPhaseLabel_2)

        self.auditInputPhaseTE_2 = QLineEdit(self.inputPhaseGB_2)
        self.auditInputPhaseTE_2.setObjectName(u"auditInputPhaseTE_2")
        sizePolicy4.setHeightForWidth(self.auditInputPhaseTE_2.sizePolicy().hasHeightForWidth())
        self.auditInputPhaseTE_2.setSizePolicy(sizePolicy4)
        self.auditInputPhaseTE_2.setMinimumSize(QSize(250, 0))

        self.verticalLayout_75.addWidget(self.auditInputPhaseTE_2)

        self.auditIdentityPhaseLabel_2 = QLabel(self.inputPhaseGB_2)
        self.auditIdentityPhaseLabel_2.setObjectName(u"auditIdentityPhaseLabel_2")

        self.verticalLayout_75.addWidget(self.auditIdentityPhaseLabel_2)

        self.auditIdentityPhaseTE_2 = QLineEdit(self.inputPhaseGB_2)
        self.auditIdentityPhaseTE_2.setObjectName(u"auditIdentityPhaseTE_2")
        sizePolicy4.setHeightForWidth(self.auditIdentityPhaseTE_2.sizePolicy().hasHeightForWidth())
        self.auditIdentityPhaseTE_2.setSizePolicy(sizePolicy4)
        self.auditIdentityPhaseTE_2.setMinimumSize(QSize(250, 0))

        self.verticalLayout_75.addWidget(self.auditIdentityPhaseTE_2)

        self.auditInceptionPhaseLabel_2 = QLabel(self.inputPhaseGB_2)
        self.auditInceptionPhaseLabel_2.setObjectName(u"auditInceptionPhaseLabel_2")

        self.verticalLayout_75.addWidget(self.auditInceptionPhaseLabel_2)

        self.auditInceptionPhaseTE_2 = QLineEdit(self.inputPhaseGB_2)
        self.auditInceptionPhaseTE_2.setObjectName(u"auditInceptionPhaseTE_2")
        sizePolicy4.setHeightForWidth(self.auditInceptionPhaseTE_2.sizePolicy().hasHeightForWidth())
        self.auditInceptionPhaseTE_2.setSizePolicy(sizePolicy4)
        self.auditInceptionPhaseTE_2.setMinimumSize(QSize(250, 0))

        self.verticalLayout_75.addWidget(self.auditInceptionPhaseTE_2)


        self.horizontalLayout_17.addWidget(self.inputPhaseGB_2)

        self.identityPhaseGB_2 = QGroupBox(self.groupBox_4)
        self.identityPhaseGB_2.setObjectName(u"identityPhaseGB_2")
        self.verticalLayout_76 = QVBoxLayout(self.identityPhaseGB_2)
        self.verticalLayout_76.setObjectName(u"verticalLayout_76")
        self.auditInputPhaseLabel_3 = QLabel(self.identityPhaseGB_2)
        self.auditInputPhaseLabel_3.setObjectName(u"auditInputPhaseLabel_3")

        self.verticalLayout_76.addWidget(self.auditInputPhaseLabel_3)

        self.auditInputPhaseTE_3 = QLineEdit(self.identityPhaseGB_2)
        self.auditInputPhaseTE_3.setObjectName(u"auditInputPhaseTE_3")
        sizePolicy4.setHeightForWidth(self.auditInputPhaseTE_3.sizePolicy().hasHeightForWidth())
        self.auditInputPhaseTE_3.setSizePolicy(sizePolicy4)
        self.auditInputPhaseTE_3.setMinimumSize(QSize(250, 0))

        self.verticalLayout_76.addWidget(self.auditInputPhaseTE_3)

        self.auditIdentityPhaseLabel_3 = QLabel(self.identityPhaseGB_2)
        self.auditIdentityPhaseLabel_3.setObjectName(u"auditIdentityPhaseLabel_3")

        self.verticalLayout_76.addWidget(self.auditIdentityPhaseLabel_3)

        self.auditIdentityPhaseTE_3 = QLineEdit(self.identityPhaseGB_2)
        self.auditIdentityPhaseTE_3.setObjectName(u"auditIdentityPhaseTE_3")
        sizePolicy4.setHeightForWidth(self.auditIdentityPhaseTE_3.sizePolicy().hasHeightForWidth())
        self.auditIdentityPhaseTE_3.setSizePolicy(sizePolicy4)
        self.auditIdentityPhaseTE_3.setMinimumSize(QSize(250, 0))

        self.verticalLayout_76.addWidget(self.auditIdentityPhaseTE_3)

        self.auditInceptionPhaseLabel_3 = QLabel(self.identityPhaseGB_2)
        self.auditInceptionPhaseLabel_3.setObjectName(u"auditInceptionPhaseLabel_3")

        self.verticalLayout_76.addWidget(self.auditInceptionPhaseLabel_3)

        self.auditInceptionPhaseTE_3 = QLineEdit(self.identityPhaseGB_2)
        self.auditInceptionPhaseTE_3.setObjectName(u"auditInceptionPhaseTE_3")
        sizePolicy4.setHeightForWidth(self.auditInceptionPhaseTE_3.sizePolicy().hasHeightForWidth())
        self.auditInceptionPhaseTE_3.setSizePolicy(sizePolicy4)
        self.auditInceptionPhaseTE_3.setMinimumSize(QSize(250, 0))

        self.verticalLayout_76.addWidget(self.auditInceptionPhaseTE_3)


        self.horizontalLayout_17.addWidget(self.identityPhaseGB_2)

        self.inceptionPhaseGB = QGroupBox(self.groupBox_4)
        self.inceptionPhaseGB.setObjectName(u"inceptionPhaseGB")
        self.verticalLayout_77 = QVBoxLayout(self.inceptionPhaseGB)
        self.verticalLayout_77.setObjectName(u"verticalLayout_77")
        self.auditInputPhaseLabel_4 = QLabel(self.inceptionPhaseGB)
        self.auditInputPhaseLabel_4.setObjectName(u"auditInputPhaseLabel_4")

        self.verticalLayout_77.addWidget(self.auditInputPhaseLabel_4)

        self.auditInputPhaseTE_4 = QLineEdit(self.inceptionPhaseGB)
        self.auditInputPhaseTE_4.setObjectName(u"auditInputPhaseTE_4")
        sizePolicy4.setHeightForWidth(self.auditInputPhaseTE_4.sizePolicy().hasHeightForWidth())
        self.auditInputPhaseTE_4.setSizePolicy(sizePolicy4)
        self.auditInputPhaseTE_4.setMinimumSize(QSize(250, 0))

        self.verticalLayout_77.addWidget(self.auditInputPhaseTE_4)

        self.auditIdentityPhaseLabel_4 = QLabel(self.inceptionPhaseGB)
        self.auditIdentityPhaseLabel_4.setObjectName(u"auditIdentityPhaseLabel_4")

        self.verticalLayout_77.addWidget(self.auditIdentityPhaseLabel_4)

        self.auditIdentityPhaseTE_4 = QLineEdit(self.inceptionPhaseGB)
        self.auditIdentityPhaseTE_4.setObjectName(u"auditIdentityPhaseTE_4")
        sizePolicy4.setHeightForWidth(self.auditIdentityPhaseTE_4.sizePolicy().hasHeightForWidth())
        self.auditIdentityPhaseTE_4.setSizePolicy(sizePolicy4)
        self.auditIdentityPhaseTE_4.setMinimumSize(QSize(250, 0))

        self.verticalLayout_77.addWidget(self.auditIdentityPhaseTE_4)

        self.auditInceptionPhaseLabel_4 = QLabel(self.inceptionPhaseGB)
        self.auditInceptionPhaseLabel_4.setObjectName(u"auditInceptionPhaseLabel_4")

        self.verticalLayout_77.addWidget(self.auditInceptionPhaseLabel_4)

        self.auditInceptionPhaseTE_4 = QLineEdit(self.inceptionPhaseGB)
        self.auditInceptionPhaseTE_4.setObjectName(u"auditInceptionPhaseTE_4")
        sizePolicy4.setHeightForWidth(self.auditInceptionPhaseTE_4.sizePolicy().hasHeightForWidth())
        self.auditInceptionPhaseTE_4.setSizePolicy(sizePolicy4)
        self.auditInceptionPhaseTE_4.setMinimumSize(QSize(250, 0))

        self.verticalLayout_77.addWidget(self.auditInceptionPhaseTE_4)


        self.horizontalLayout_17.addWidget(self.inceptionPhaseGB)


        self.gridLayout_3.addWidget(self.groupBox_4, 1, 0, 1, 1)

        self.arcsGB = QGroupBox(self.auditFrame)
        self.arcsGB.setObjectName(u"arcsGB")
        self.gridLayout_4 = QGridLayout(self.arcsGB)
        self.gridLayout_4.setObjectName(u"gridLayout_4")
        self.finalOutputGB = QGroupBox(self.arcsGB)
        self.finalOutputGB.setObjectName(u"finalOutputGB")
        self.horizontalLayout_41 = QHBoxLayout(self.finalOutputGB)
        self.horizontalLayout_41.setObjectName(u"horizontalLayout_41")
        self.finalOuputTE = QTextEdit(self.finalOutputGB)
        self.finalOuputTE.setObjectName(u"finalOuputTE")

        self.horizontalLayout_41.addWidget(self.finalOuputTE)


        self.gridLayout_4.addWidget(self.finalOutputGB, 0, 3, 1, 1)

        self.decompGB = QGroupBox(self.arcsGB)
        self.decompGB.setObjectName(u"decompGB")
        self.horizontalLayout_40 = QHBoxLayout(self.decompGB)
        self.horizontalLayout_40.setObjectName(u"horizontalLayout_40")
        self.verticalLayout_71 = QVBoxLayout()
        self.verticalLayout_71.setObjectName(u"verticalLayout_71")
        self.arcLabel_1 = QLabel(self.decompGB)
        self.arcLabel_1.setObjectName(u"arcLabel_1")

        self.verticalLayout_71.addWidget(self.arcLabel_1)

        self.arcLabel_3 = QLabel(self.decompGB)
        self.arcLabel_3.setObjectName(u"arcLabel_3")

        self.verticalLayout_71.addWidget(self.arcLabel_3)

        self.arcLabel_2 = QLabel(self.decompGB)
        self.arcLabel_2.setObjectName(u"arcLabel_2")

        self.verticalLayout_71.addWidget(self.arcLabel_2)

        self.arcLabel_4 = QLabel(self.decompGB)
        self.arcLabel_4.setObjectName(u"arcLabel_4")

        self.verticalLayout_71.addWidget(self.arcLabel_4)

        self.arcLabel_5 = QLabel(self.decompGB)
        self.arcLabel_5.setObjectName(u"arcLabel_5")

        self.verticalLayout_71.addWidget(self.arcLabel_5)

        self.arcLabel_6 = QLabel(self.decompGB)
        self.arcLabel_6.setObjectName(u"arcLabel_6")

        self.verticalLayout_71.addWidget(self.arcLabel_6)

        self.arcLabel_7 = QLabel(self.decompGB)
        self.arcLabel_7.setObjectName(u"arcLabel_7")

        self.verticalLayout_71.addWidget(self.arcLabel_7)


        self.horizontalLayout_40.addLayout(self.verticalLayout_71)

        self.verticalLayout_72 = QVBoxLayout()
        self.verticalLayout_72.setObjectName(u"verticalLayout_72")
        self.arcTE_1 = QLineEdit(self.decompGB)
        self.arcTE_1.setObjectName(u"arcTE_1")
        sizePolicy4.setHeightForWidth(self.arcTE_1.sizePolicy().hasHeightForWidth())
        self.arcTE_1.setSizePolicy(sizePolicy4)
        self.arcTE_1.setMinimumSize(QSize(200, 0))

        self.verticalLayout_72.addWidget(self.arcTE_1)

        self.arcTE_2 = QLineEdit(self.decompGB)
        self.arcTE_2.setObjectName(u"arcTE_2")
        sizePolicy4.setHeightForWidth(self.arcTE_2.sizePolicy().hasHeightForWidth())
        self.arcTE_2.setSizePolicy(sizePolicy4)
        self.arcTE_2.setMinimumSize(QSize(200, 0))

        self.verticalLayout_72.addWidget(self.arcTE_2)

        self.arcTE_3 = QLineEdit(self.decompGB)
        self.arcTE_3.setObjectName(u"arcTE_3")
        sizePolicy4.setHeightForWidth(self.arcTE_3.sizePolicy().hasHeightForWidth())
        self.arcTE_3.setSizePolicy(sizePolicy4)
        self.arcTE_3.setMinimumSize(QSize(200, 0))

        self.verticalLayout_72.addWidget(self.arcTE_3)

        self.arcTE_4 = QLineEdit(self.decompGB)
        self.arcTE_4.setObjectName(u"arcTE_4")
        sizePolicy4.setHeightForWidth(self.arcTE_4.sizePolicy().hasHeightForWidth())
        self.arcTE_4.setSizePolicy(sizePolicy4)
        self.arcTE_4.setMinimumSize(QSize(200, 0))

        self.verticalLayout_72.addWidget(self.arcTE_4)

        self.arcTE_5 = QLineEdit(self.decompGB)
        self.arcTE_5.setObjectName(u"arcTE_5")
        sizePolicy4.setHeightForWidth(self.arcTE_5.sizePolicy().hasHeightForWidth())
        self.arcTE_5.setSizePolicy(sizePolicy4)
        self.arcTE_5.setMinimumSize(QSize(200, 0))

        self.verticalLayout_72.addWidget(self.arcTE_5)

        self.arcTE_6 = QLineEdit(self.decompGB)
        self.arcTE_6.setObjectName(u"arcTE_6")
        sizePolicy4.setHeightForWidth(self.arcTE_6.sizePolicy().hasHeightForWidth())
        self.arcTE_6.setSizePolicy(sizePolicy4)
        self.arcTE_6.setMinimumSize(QSize(200, 0))

        self.verticalLayout_72.addWidget(self.arcTE_6)

        self.arcTE_7 = QLineEdit(self.decompGB)
        self.arcTE_7.setObjectName(u"arcTE_7")
        sizePolicy4.setHeightForWidth(self.arcTE_7.sizePolicy().hasHeightForWidth())
        self.arcTE_7.setSizePolicy(sizePolicy4)
        self.arcTE_7.setMinimumSize(QSize(200, 0))

        self.verticalLayout_72.addWidget(self.arcTE_7)


        self.horizontalLayout_40.addLayout(self.verticalLayout_72)


        self.gridLayout_4.addWidget(self.decompGB, 0, 0, 1, 1)

        self.structPromptGB = QGroupBox(self.arcsGB)
        self.structPromptGB.setObjectName(u"structPromptGB")
        self.horizontalLayout_5 = QHBoxLayout(self.structPromptGB)
        self.horizontalLayout_5.setObjectName(u"horizontalLayout_5")
        self.verticalLayout_17 = QVBoxLayout()
        self.verticalLayout_17.setObjectName(u"verticalLayout_17")
        self.triSumLabel_1 = QLabel(self.structPromptGB)
        self.triSumLabel_1.setObjectName(u"triSumLabel_1")

        self.verticalLayout_17.addWidget(self.triSumLabel_1)

        self.triSumLabel_2 = QLabel(self.structPromptGB)
        self.triSumLabel_2.setObjectName(u"triSumLabel_2")

        self.verticalLayout_17.addWidget(self.triSumLabel_2)

        self.triSumLabel_3 = QLabel(self.structPromptGB)
        self.triSumLabel_3.setObjectName(u"triSumLabel_3")

        self.verticalLayout_17.addWidget(self.triSumLabel_3)

        self.triSumLabel_4 = QLabel(self.structPromptGB)
        self.triSumLabel_4.setObjectName(u"triSumLabel_4")

        self.verticalLayout_17.addWidget(self.triSumLabel_4)

        self.triSumLabel_5 = QLabel(self.structPromptGB)
        self.triSumLabel_5.setObjectName(u"triSumLabel_5")

        self.verticalLayout_17.addWidget(self.triSumLabel_5)

        self.triSumLabel_6 = QLabel(self.structPromptGB)
        self.triSumLabel_6.setObjectName(u"triSumLabel_6")

        self.verticalLayout_17.addWidget(self.triSumLabel_6)

        self.triSumLabel_7 = QLabel(self.structPromptGB)
        self.triSumLabel_7.setObjectName(u"triSumLabel_7")

        self.verticalLayout_17.addWidget(self.triSumLabel_7)


        self.horizontalLayout_5.addLayout(self.verticalLayout_17)

        self.verticalLayout_18 = QVBoxLayout()
        self.verticalLayout_18.setObjectName(u"verticalLayout_18")
        self.triSumLE_1 = QLineEdit(self.structPromptGB)
        self.triSumLE_1.setObjectName(u"triSumLE_1")
        sizePolicy4.setHeightForWidth(self.triSumLE_1.sizePolicy().hasHeightForWidth())
        self.triSumLE_1.setSizePolicy(sizePolicy4)
        self.triSumLE_1.setMinimumSize(QSize(200, 0))

        self.verticalLayout_18.addWidget(self.triSumLE_1)

        self.triSumLE_2 = QLineEdit(self.structPromptGB)
        self.triSumLE_2.setObjectName(u"triSumLE_2")
        sizePolicy4.setHeightForWidth(self.triSumLE_2.sizePolicy().hasHeightForWidth())
        self.triSumLE_2.setSizePolicy(sizePolicy4)
        self.triSumLE_2.setMinimumSize(QSize(200, 0))

        self.verticalLayout_18.addWidget(self.triSumLE_2)

        self.triSumLE_3 = QLineEdit(self.structPromptGB)
        self.triSumLE_3.setObjectName(u"triSumLE_3")
        sizePolicy4.setHeightForWidth(self.triSumLE_3.sizePolicy().hasHeightForWidth())
        self.triSumLE_3.setSizePolicy(sizePolicy4)
        self.triSumLE_3.setMinimumSize(QSize(200, 0))

        self.verticalLayout_18.addWidget(self.triSumLE_3)

        self.triSumLE_4 = QLineEdit(self.structPromptGB)
        self.triSumLE_4.setObjectName(u"triSumLE_4")
        sizePolicy4.setHeightForWidth(self.triSumLE_4.sizePolicy().hasHeightForWidth())
        self.triSumLE_4.setSizePolicy(sizePolicy4)
        self.triSumLE_4.setMinimumSize(QSize(200, 0))

        self.verticalLayout_18.addWidget(self.triSumLE_4)

        self.triSumLE_5 = QLineEdit(self.structPromptGB)
        self.triSumLE_5.setObjectName(u"triSumLE_5")
        sizePolicy4.setHeightForWidth(self.triSumLE_5.sizePolicy().hasHeightForWidth())
        self.triSumLE_5.setSizePolicy(sizePolicy4)
        self.triSumLE_5.setMinimumSize(QSize(200, 0))

        self.verticalLayout_18.addWidget(self.triSumLE_5)

        self.triSumLE_6 = QLineEdit(self.structPromptGB)
        self.triSumLE_6.setObjectName(u"triSumLE_6")
        sizePolicy4.setHeightForWidth(self.triSumLE_6.sizePolicy().hasHeightForWidth())
        self.triSumLE_6.setSizePolicy(sizePolicy4)
        self.triSumLE_6.setMinimumSize(QSize(200, 0))

        self.verticalLayout_18.addWidget(self.triSumLE_6)

        self.triSumLE_7 = QLineEdit(self.structPromptGB)
        self.triSumLE_7.setObjectName(u"triSumLE_7")
        sizePolicy4.setHeightForWidth(self.triSumLE_7.sizePolicy().hasHeightForWidth())
        self.triSumLE_7.setSizePolicy(sizePolicy4)
        self.triSumLE_7.setMinimumSize(QSize(200, 0))

        self.verticalLayout_18.addWidget(self.triSumLE_7)


        self.horizontalLayout_5.addLayout(self.verticalLayout_18)


        self.gridLayout_4.addWidget(self.structPromptGB, 0, 1, 1, 1)


        self.gridLayout_3.addWidget(self.arcsGB, 0, 1, 1, 1)

        self.triadsGB = QGroupBox(self.auditFrame)
        self.triadsGB.setObjectName(u"triadsGB")
        self.horizontalLayout_36 = QHBoxLayout(self.triadsGB)
        self.horizontalLayout_36.setObjectName(u"horizontalLayout_36")
        self.triadGB_1 = QGroupBox(self.triadsGB)
        self.triadGB_1.setObjectName(u"triadGB_1")
        self.horizontalLayout_8 = QHBoxLayout(self.triadGB_1)
        self.horizontalLayout_8.setObjectName(u"horizontalLayout_8")
        self.verticalLayout_20 = QVBoxLayout()
        self.verticalLayout_20.setObjectName(u"verticalLayout_20")
        self.triSumLabel_8 = QLabel(self.triadGB_1)
        self.triSumLabel_8.setObjectName(u"triSumLabel_8")

        self.verticalLayout_20.addWidget(self.triSumLabel_8)

        self.triSumLabel_9 = QLabel(self.triadGB_1)
        self.triSumLabel_9.setObjectName(u"triSumLabel_9")

        self.verticalLayout_20.addWidget(self.triSumLabel_9)

        self.triSumLabel_10 = QLabel(self.triadGB_1)
        self.triSumLabel_10.setObjectName(u"triSumLabel_10")

        self.verticalLayout_20.addWidget(self.triSumLabel_10)

        self.triSumLabel_11 = QLabel(self.triadGB_1)
        self.triSumLabel_11.setObjectName(u"triSumLabel_11")

        self.verticalLayout_20.addWidget(self.triSumLabel_11)

        self.triSumLabel_12 = QLabel(self.triadGB_1)
        self.triSumLabel_12.setObjectName(u"triSumLabel_12")

        self.verticalLayout_20.addWidget(self.triSumLabel_12)

        self.triSumLabel_13 = QLabel(self.triadGB_1)
        self.triSumLabel_13.setObjectName(u"triSumLabel_13")

        self.verticalLayout_20.addWidget(self.triSumLabel_13)

        self.triSumLabel_14 = QLabel(self.triadGB_1)
        self.triSumLabel_14.setObjectName(u"triSumLabel_14")

        self.verticalLayout_20.addWidget(self.triSumLabel_14)


        self.horizontalLayout_8.addLayout(self.verticalLayout_20)

        self.verticalLayout_19 = QVBoxLayout()
        self.verticalLayout_19.setObjectName(u"verticalLayout_19")
        self.triSumLE_8 = QLineEdit(self.triadGB_1)
        self.triSumLE_8.setObjectName(u"triSumLE_8")
        sizePolicy4.setHeightForWidth(self.triSumLE_8.sizePolicy().hasHeightForWidth())
        self.triSumLE_8.setSizePolicy(sizePolicy4)
        self.triSumLE_8.setMinimumSize(QSize(200, 0))

        self.verticalLayout_19.addWidget(self.triSumLE_8)

        self.triSumLE_9 = QLineEdit(self.triadGB_1)
        self.triSumLE_9.setObjectName(u"triSumLE_9")
        sizePolicy4.setHeightForWidth(self.triSumLE_9.sizePolicy().hasHeightForWidth())
        self.triSumLE_9.setSizePolicy(sizePolicy4)
        self.triSumLE_9.setMinimumSize(QSize(200, 0))

        self.verticalLayout_19.addWidget(self.triSumLE_9)

        self.triSumLE_10 = QLineEdit(self.triadGB_1)
        self.triSumLE_10.setObjectName(u"triSumLE_10")
        sizePolicy4.setHeightForWidth(self.triSumLE_10.sizePolicy().hasHeightForWidth())
        self.triSumLE_10.setSizePolicy(sizePolicy4)
        self.triSumLE_10.setMinimumSize(QSize(200, 0))

        self.verticalLayout_19.addWidget(self.triSumLE_10)

        self.triSumLE_11 = QLineEdit(self.triadGB_1)
        self.triSumLE_11.setObjectName(u"triSumLE_11")
        sizePolicy4.setHeightForWidth(self.triSumLE_11.sizePolicy().hasHeightForWidth())
        self.triSumLE_11.setSizePolicy(sizePolicy4)
        self.triSumLE_11.setMinimumSize(QSize(200, 0))

        self.verticalLayout_19.addWidget(self.triSumLE_11)

        self.triSumLE_12 = QLineEdit(self.triadGB_1)
        self.triSumLE_12.setObjectName(u"triSumLE_12")
        sizePolicy4.setHeightForWidth(self.triSumLE_12.sizePolicy().hasHeightForWidth())
        self.triSumLE_12.setSizePolicy(sizePolicy4)
        self.triSumLE_12.setMinimumSize(QSize(200, 0))

        self.verticalLayout_19.addWidget(self.triSumLE_12)

        self.triSumLE_13 = QLineEdit(self.triadGB_1)
        self.triSumLE_13.setObjectName(u"triSumLE_13")
        sizePolicy4.setHeightForWidth(self.triSumLE_13.sizePolicy().hasHeightForWidth())
        self.triSumLE_13.setSizePolicy(sizePolicy4)
        self.triSumLE_13.setMinimumSize(QSize(200, 0))

        self.verticalLayout_19.addWidget(self.triSumLE_13)

        self.triSumLE_14 = QLineEdit(self.triadGB_1)
        self.triSumLE_14.setObjectName(u"triSumLE_14")
        sizePolicy4.setHeightForWidth(self.triSumLE_14.sizePolicy().hasHeightForWidth())
        self.triSumLE_14.setSizePolicy(sizePolicy4)
        self.triSumLE_14.setMinimumSize(QSize(200, 0))

        self.verticalLayout_19.addWidget(self.triSumLE_14)


        self.horizontalLayout_8.addLayout(self.verticalLayout_19)


        self.horizontalLayout_36.addWidget(self.triadGB_1)

        self.triadGB_2 = QGroupBox(self.triadsGB)
        self.triadGB_2.setObjectName(u"triadGB_2")
        self.horizontalLayout_7 = QHBoxLayout(self.triadGB_2)
        self.horizontalLayout_7.setObjectName(u"horizontalLayout_7")
        self.verticalLayout_21 = QVBoxLayout()
        self.verticalLayout_21.setObjectName(u"verticalLayout_21")
        self.triSumLabel_15 = QLabel(self.triadGB_2)
        self.triSumLabel_15.setObjectName(u"triSumLabel_15")

        self.verticalLayout_21.addWidget(self.triSumLabel_15)

        self.triSumLabel_16 = QLabel(self.triadGB_2)
        self.triSumLabel_16.setObjectName(u"triSumLabel_16")

        self.verticalLayout_21.addWidget(self.triSumLabel_16)

        self.triSumLabel_17 = QLabel(self.triadGB_2)
        self.triSumLabel_17.setObjectName(u"triSumLabel_17")

        self.verticalLayout_21.addWidget(self.triSumLabel_17)

        self.triSumLabel_18 = QLabel(self.triadGB_2)
        self.triSumLabel_18.setObjectName(u"triSumLabel_18")

        self.verticalLayout_21.addWidget(self.triSumLabel_18)

        self.triSumLabel_19 = QLabel(self.triadGB_2)
        self.triSumLabel_19.setObjectName(u"triSumLabel_19")

        self.verticalLayout_21.addWidget(self.triSumLabel_19)

        self.triSumLabel_20 = QLabel(self.triadGB_2)
        self.triSumLabel_20.setObjectName(u"triSumLabel_20")

        self.verticalLayout_21.addWidget(self.triSumLabel_20)

        self.triSumLabel_21 = QLabel(self.triadGB_2)
        self.triSumLabel_21.setObjectName(u"triSumLabel_21")

        self.verticalLayout_21.addWidget(self.triSumLabel_21)


        self.horizontalLayout_7.addLayout(self.verticalLayout_21)

        self.verticalLayout_62 = QVBoxLayout()
        self.verticalLayout_62.setObjectName(u"verticalLayout_62")
        self.triSumLE_15 = QLineEdit(self.triadGB_2)
        self.triSumLE_15.setObjectName(u"triSumLE_15")
        sizePolicy4.setHeightForWidth(self.triSumLE_15.sizePolicy().hasHeightForWidth())
        self.triSumLE_15.setSizePolicy(sizePolicy4)
        self.triSumLE_15.setMinimumSize(QSize(200, 0))

        self.verticalLayout_62.addWidget(self.triSumLE_15)

        self.triSumLE_16 = QLineEdit(self.triadGB_2)
        self.triSumLE_16.setObjectName(u"triSumLE_16")
        sizePolicy4.setHeightForWidth(self.triSumLE_16.sizePolicy().hasHeightForWidth())
        self.triSumLE_16.setSizePolicy(sizePolicy4)
        self.triSumLE_16.setMinimumSize(QSize(200, 0))

        self.verticalLayout_62.addWidget(self.triSumLE_16)

        self.triSumLE_17 = QLineEdit(self.triadGB_2)
        self.triSumLE_17.setObjectName(u"triSumLE_17")
        sizePolicy4.setHeightForWidth(self.triSumLE_17.sizePolicy().hasHeightForWidth())
        self.triSumLE_17.setSizePolicy(sizePolicy4)
        self.triSumLE_17.setMinimumSize(QSize(200, 0))

        self.verticalLayout_62.addWidget(self.triSumLE_17)

        self.triSumLE_18 = QLineEdit(self.triadGB_2)
        self.triSumLE_18.setObjectName(u"triSumLE_18")
        sizePolicy4.setHeightForWidth(self.triSumLE_18.sizePolicy().hasHeightForWidth())
        self.triSumLE_18.setSizePolicy(sizePolicy4)
        self.triSumLE_18.setMinimumSize(QSize(200, 0))

        self.verticalLayout_62.addWidget(self.triSumLE_18)

        self.triSumLE_19 = QLineEdit(self.triadGB_2)
        self.triSumLE_19.setObjectName(u"triSumLE_19")
        sizePolicy4.setHeightForWidth(self.triSumLE_19.sizePolicy().hasHeightForWidth())
        self.triSumLE_19.setSizePolicy(sizePolicy4)
        self.triSumLE_19.setMinimumSize(QSize(200, 0))

        self.verticalLayout_62.addWidget(self.triSumLE_19)

        self.triSumLE_20 = QLineEdit(self.triadGB_2)
        self.triSumLE_20.setObjectName(u"triSumLE_20")
        sizePolicy4.setHeightForWidth(self.triSumLE_20.sizePolicy().hasHeightForWidth())
        self.triSumLE_20.setSizePolicy(sizePolicy4)
        self.triSumLE_20.setMinimumSize(QSize(200, 0))

        self.verticalLayout_62.addWidget(self.triSumLE_20)

        self.triSumLE_21 = QLineEdit(self.triadGB_2)
        self.triSumLE_21.setObjectName(u"triSumLE_21")
        sizePolicy4.setHeightForWidth(self.triSumLE_21.sizePolicy().hasHeightForWidth())
        self.triSumLE_21.setSizePolicy(sizePolicy4)
        self.triSumLE_21.setMinimumSize(QSize(200, 0))

        self.verticalLayout_62.addWidget(self.triSumLE_21)


        self.horizontalLayout_7.addLayout(self.verticalLayout_62)


        self.horizontalLayout_36.addWidget(self.triadGB_2)

        self.triadGB_3 = QGroupBox(self.triadsGB)
        self.triadGB_3.setObjectName(u"triadGB_3")
        self.horizontalLayout_6 = QHBoxLayout(self.triadGB_3)
        self.horizontalLayout_6.setObjectName(u"horizontalLayout_6")
        self.verticalLayout_64 = QVBoxLayout()
        self.verticalLayout_64.setObjectName(u"verticalLayout_64")
        self.triSumLabel_22 = QLabel(self.triadGB_3)
        self.triSumLabel_22.setObjectName(u"triSumLabel_22")

        self.verticalLayout_64.addWidget(self.triSumLabel_22)

        self.triSumLabel_23 = QLabel(self.triadGB_3)
        self.triSumLabel_23.setObjectName(u"triSumLabel_23")

        self.verticalLayout_64.addWidget(self.triSumLabel_23)

        self.triSumLabel_24 = QLabel(self.triadGB_3)
        self.triSumLabel_24.setObjectName(u"triSumLabel_24")

        self.verticalLayout_64.addWidget(self.triSumLabel_24)

        self.triSumLabel_25 = QLabel(self.triadGB_3)
        self.triSumLabel_25.setObjectName(u"triSumLabel_25")

        self.verticalLayout_64.addWidget(self.triSumLabel_25)

        self.triSumLabel_26 = QLabel(self.triadGB_3)
        self.triSumLabel_26.setObjectName(u"triSumLabel_26")

        self.verticalLayout_64.addWidget(self.triSumLabel_26)

        self.triSumLabel_27 = QLabel(self.triadGB_3)
        self.triSumLabel_27.setObjectName(u"triSumLabel_27")

        self.verticalLayout_64.addWidget(self.triSumLabel_27)

        self.triSumLabel_28 = QLabel(self.triadGB_3)
        self.triSumLabel_28.setObjectName(u"triSumLabel_28")

        self.verticalLayout_64.addWidget(self.triSumLabel_28)


        self.horizontalLayout_6.addLayout(self.verticalLayout_64)

        self.verticalLayout_63 = QVBoxLayout()
        self.verticalLayout_63.setObjectName(u"verticalLayout_63")
        self.triSumLE_22 = QLineEdit(self.triadGB_3)
        self.triSumLE_22.setObjectName(u"triSumLE_22")
        sizePolicy4.setHeightForWidth(self.triSumLE_22.sizePolicy().hasHeightForWidth())
        self.triSumLE_22.setSizePolicy(sizePolicy4)
        self.triSumLE_22.setMinimumSize(QSize(200, 0))

        self.verticalLayout_63.addWidget(self.triSumLE_22)

        self.triSumLE_23 = QLineEdit(self.triadGB_3)
        self.triSumLE_23.setObjectName(u"triSumLE_23")
        sizePolicy4.setHeightForWidth(self.triSumLE_23.sizePolicy().hasHeightForWidth())
        self.triSumLE_23.setSizePolicy(sizePolicy4)
        self.triSumLE_23.setMinimumSize(QSize(200, 0))

        self.verticalLayout_63.addWidget(self.triSumLE_23)

        self.triSumLE_24 = QLineEdit(self.triadGB_3)
        self.triSumLE_24.setObjectName(u"triSumLE_24")
        sizePolicy4.setHeightForWidth(self.triSumLE_24.sizePolicy().hasHeightForWidth())
        self.triSumLE_24.setSizePolicy(sizePolicy4)
        self.triSumLE_24.setMinimumSize(QSize(200, 0))

        self.verticalLayout_63.addWidget(self.triSumLE_24)

        self.triSumLE_25 = QLineEdit(self.triadGB_3)
        self.triSumLE_25.setObjectName(u"triSumLE_25")
        sizePolicy4.setHeightForWidth(self.triSumLE_25.sizePolicy().hasHeightForWidth())
        self.triSumLE_25.setSizePolicy(sizePolicy4)
        self.triSumLE_25.setMinimumSize(QSize(200, 0))

        self.verticalLayout_63.addWidget(self.triSumLE_25)

        self.triSumLE_26 = QLineEdit(self.triadGB_3)
        self.triSumLE_26.setObjectName(u"triSumLE_26")
        sizePolicy4.setHeightForWidth(self.triSumLE_26.sizePolicy().hasHeightForWidth())
        self.triSumLE_26.setSizePolicy(sizePolicy4)
        self.triSumLE_26.setMinimumSize(QSize(200, 0))

        self.verticalLayout_63.addWidget(self.triSumLE_26)

        self.triSumLE_27 = QLineEdit(self.triadGB_3)
        self.triSumLE_27.setObjectName(u"triSumLE_27")
        sizePolicy4.setHeightForWidth(self.triSumLE_27.sizePolicy().hasHeightForWidth())
        self.triSumLE_27.setSizePolicy(sizePolicy4)
        self.triSumLE_27.setMinimumSize(QSize(200, 0))

        self.verticalLayout_63.addWidget(self.triSumLE_27)

        self.triSumLE_28 = QLineEdit(self.triadGB_3)
        self.triSumLE_28.setObjectName(u"triSumLE_28")
        sizePolicy4.setHeightForWidth(self.triSumLE_28.sizePolicy().hasHeightForWidth())
        self.triSumLE_28.setSizePolicy(sizePolicy4)
        self.triSumLE_28.setMinimumSize(QSize(200, 0))

        self.verticalLayout_63.addWidget(self.triSumLE_28)


        self.horizontalLayout_6.addLayout(self.verticalLayout_63)


        self.horizontalLayout_36.addWidget(self.triadGB_3)


        self.gridLayout_3.addWidget(self.triadsGB, 1, 1, 1, 1)

        self.datasetGB = QGroupBox(self.auditFrame)
        self.datasetGB.setObjectName(u"datasetGB")
        self.horizontalLayout_37 = QHBoxLayout(self.datasetGB)
        self.horizontalLayout_37.setObjectName(u"horizontalLayout_37")
        self.attributionB = QGroupBox(self.datasetGB)
        self.attributionB.setObjectName(u"attributionB")
        self.horizontalLayout_43 = QHBoxLayout(self.attributionB)
        self.horizontalLayout_43.setObjectName(u"horizontalLayout_43")
        self.verticalLayout_74 = QVBoxLayout()
        self.verticalLayout_74.setObjectName(u"verticalLayout_74")
        self.auditTemplateNameLabel = QLabel(self.attributionB)
        self.auditTemplateNameLabel.setObjectName(u"auditTemplateNameLabel")

        self.verticalLayout_74.addWidget(self.auditTemplateNameLabel)

        self.auditDateLabel = QLabel(self.attributionB)
        self.auditDateLabel.setObjectName(u"auditDateLabel")

        self.verticalLayout_74.addWidget(self.auditDateLabel)

        self.auditDeptLabel = QLabel(self.attributionB)
        self.auditDeptLabel.setObjectName(u"auditDeptLabel")

        self.verticalLayout_74.addWidget(self.auditDeptLabel)

        self.auditClassificationLabel = QLabel(self.attributionB)
        self.auditClassificationLabel.setObjectName(u"auditClassificationLabel")

        self.verticalLayout_74.addWidget(self.auditClassificationLabel)

        self.auditAuthorLabel = QLabel(self.attributionB)
        self.auditAuthorLabel.setObjectName(u"auditAuthorLabel")

        self.verticalLayout_74.addWidget(self.auditAuthorLabel)


        self.horizontalLayout_43.addLayout(self.verticalLayout_74)

        self.verticalLayout_81 = QVBoxLayout()
        self.verticalLayout_81.setObjectName(u"verticalLayout_81")
        self.auditDeptLE = QLineEdit(self.attributionB)
        self.auditDeptLE.setObjectName(u"auditDeptLE")

        self.verticalLayout_81.addWidget(self.auditDeptLE)

        self.auditClassificationLE = QLineEdit(self.attributionB)
        self.auditClassificationLE.setObjectName(u"auditClassificationLE")

        self.verticalLayout_81.addWidget(self.auditClassificationLE)

        self.auditDateLE = QLineEdit(self.attributionB)
        self.auditDateLE.setObjectName(u"auditDateLE")

        self.verticalLayout_81.addWidget(self.auditDateLE)

        self.auditTemplateNameLE = QLineEdit(self.attributionB)
        self.auditTemplateNameLE.setObjectName(u"auditTemplateNameLE")

        self.verticalLayout_81.addWidget(self.auditTemplateNameLE)

        self.auditauthorLE = QLineEdit(self.attributionB)
        self.auditauthorLE.setObjectName(u"auditauthorLE")

        self.verticalLayout_81.addWidget(self.auditauthorLE)


        self.horizontalLayout_43.addLayout(self.verticalLayout_81)


        self.horizontalLayout_37.addWidget(self.attributionB)

        self.notesGB = QGroupBox(self.datasetGB)
        self.notesGB.setObjectName(u"notesGB")
        self.horizontalLayout_42 = QHBoxLayout(self.notesGB)
        self.horizontalLayout_42.setObjectName(u"horizontalLayout_42")
        self.notesTE_2 = QTextEdit(self.notesGB)
        self.notesTE_2.setObjectName(u"notesTE_2")

        self.horizontalLayout_42.addWidget(self.notesTE_2)


        self.horizontalLayout_37.addWidget(self.notesGB)

        self.auditTransformsGB = QGroupBox(self.datasetGB)
        self.auditTransformsGB.setObjectName(u"auditTransformsGB")
        self.verticalLayout_73 = QVBoxLayout(self.auditTransformsGB)
        self.verticalLayout_73.setObjectName(u"verticalLayout_73")
        self.auditInputPhaseLabel = QLabel(self.auditTransformsGB)
        self.auditInputPhaseLabel.setObjectName(u"auditInputPhaseLabel")

        self.verticalLayout_73.addWidget(self.auditInputPhaseLabel)

        self.auditInputPhaseTE = QLineEdit(self.auditTransformsGB)
        self.auditInputPhaseTE.setObjectName(u"auditInputPhaseTE")
        sizePolicy4.setHeightForWidth(self.auditInputPhaseTE.sizePolicy().hasHeightForWidth())
        self.auditInputPhaseTE.setSizePolicy(sizePolicy4)
        self.auditInputPhaseTE.setMinimumSize(QSize(200, 0))

        self.verticalLayout_73.addWidget(self.auditInputPhaseTE)

        self.auditIdentityPhaseLabel = QLabel(self.auditTransformsGB)
        self.auditIdentityPhaseLabel.setObjectName(u"auditIdentityPhaseLabel")

        self.verticalLayout_73.addWidget(self.auditIdentityPhaseLabel)

        self.auditIdentityPhaseTE = QLineEdit(self.auditTransformsGB)
        self.auditIdentityPhaseTE.setObjectName(u"auditIdentityPhaseTE")
        sizePolicy4.setHeightForWidth(self.auditIdentityPhaseTE.sizePolicy().hasHeightForWidth())
        self.auditIdentityPhaseTE.setSizePolicy(sizePolicy4)
        self.auditIdentityPhaseTE.setMinimumSize(QSize(200, 0))

        self.verticalLayout_73.addWidget(self.auditIdentityPhaseTE)

        self.auditInceptionPhaseLabel = QLabel(self.auditTransformsGB)
        self.auditInceptionPhaseLabel.setObjectName(u"auditInceptionPhaseLabel")

        self.verticalLayout_73.addWidget(self.auditInceptionPhaseLabel)

        self.auditInceptionPhaseTE = QLineEdit(self.auditTransformsGB)
        self.auditInceptionPhaseTE.setObjectName(u"auditInceptionPhaseTE")
        sizePolicy4.setHeightForWidth(self.auditInceptionPhaseTE.sizePolicy().hasHeightForWidth())
        self.auditInceptionPhaseTE.setSizePolicy(sizePolicy4)
        self.auditInceptionPhaseTE.setMinimumSize(QSize(200, 0))

        self.verticalLayout_73.addWidget(self.auditInceptionPhaseTE)


        self.horizontalLayout_37.addWidget(self.auditTransformsGB)


        self.gridLayout_3.addWidget(self.datasetGB, 0, 0, 1, 1)

        self.agentsGB = QGroupBox(self.auditFrame)
        self.agentsGB.setObjectName(u"agentsGB")
        self.horizontalLayout_38 = QHBoxLayout(self.agentsGB)
        self.horizontalLayout_38.setObjectName(u"horizontalLayout_38")
        self.decomposerGB = QGroupBox(self.agentsGB)
        self.decomposerGB.setObjectName(u"decomposerGB")
        self.verticalLayout_78 = QVBoxLayout(self.decomposerGB)
        self.verticalLayout_78.setObjectName(u"verticalLayout_78")
        self.decomSysPromptLabel = QLabel(self.decomposerGB)
        self.decomSysPromptLabel.setObjectName(u"decomSysPromptLabel")

        self.verticalLayout_78.addWidget(self.decomSysPromptLabel)


        self.horizontalLayout_38.addWidget(self.decomposerGB)

        self.curatorGB = QGroupBox(self.agentsGB)
        self.curatorGB.setObjectName(u"curatorGB")
        self.verticalLayout_79 = QVBoxLayout(self.curatorGB)
        self.verticalLayout_79.setObjectName(u"verticalLayout_79")
        self.curSysPromptLabel_2 = QLabel(self.curatorGB)
        self.curSysPromptLabel_2.setObjectName(u"curSysPromptLabel_2")

        self.verticalLayout_79.addWidget(self.curSysPromptLabel_2)


        self.horizontalLayout_38.addWidget(self.curatorGB)

        self.composerGB = QGroupBox(self.agentsGB)
        self.composerGB.setObjectName(u"composerGB")
        self.verticalLayout_80 = QVBoxLayout(self.composerGB)
        self.verticalLayout_80.setObjectName(u"verticalLayout_80")
        self.comSysPromptLabel_3 = QLabel(self.composerGB)
        self.comSysPromptLabel_3.setObjectName(u"comSysPromptLabel_3")

        self.verticalLayout_80.addWidget(self.comSysPromptLabel_3)


        self.horizontalLayout_38.addWidget(self.composerGB)


        self.gridLayout_3.addWidget(self.agentsGB, 2, 0, 1, 1)

        self.telGB = QGroupBox(self.auditFrame)
        self.telGB.setObjectName(u"telGB")
        self.horizontalLayout_39 = QHBoxLayout(self.telGB)
        self.horizontalLayout_39.setObjectName(u"horizontalLayout_39")
        self.checkGB_1 = QGroupBox(self.telGB)
        self.checkGB_1.setObjectName(u"checkGB_1")
        self.horizontalLayout_9 = QHBoxLayout(self.checkGB_1)
        self.horizontalLayout_9.setObjectName(u"horizontalLayout_9")
        self.verticalLayout_65 = QVBoxLayout()
        self.verticalLayout_65.setObjectName(u"verticalLayout_65")
        self.telCheckLabel_1 = QLabel(self.checkGB_1)
        self.telCheckLabel_1.setObjectName(u"telCheckLabel_1")

        self.verticalLayout_65.addWidget(self.telCheckLabel_1)

        self.telCheckLabel_2 = QLabel(self.checkGB_1)
        self.telCheckLabel_2.setObjectName(u"telCheckLabel_2")

        self.verticalLayout_65.addWidget(self.telCheckLabel_2)

        self.telCheckLabel_3 = QLabel(self.checkGB_1)
        self.telCheckLabel_3.setObjectName(u"telCheckLabel_3")

        self.verticalLayout_65.addWidget(self.telCheckLabel_3)

        self.telCheckLabel_4 = QLabel(self.checkGB_1)
        self.telCheckLabel_4.setObjectName(u"telCheckLabel_4")

        self.verticalLayout_65.addWidget(self.telCheckLabel_4)

        self.telCheckLabel_5 = QLabel(self.checkGB_1)
        self.telCheckLabel_5.setObjectName(u"telCheckLabel_5")

        self.verticalLayout_65.addWidget(self.telCheckLabel_5)

        self.telCheckLabel_6 = QLabel(self.checkGB_1)
        self.telCheckLabel_6.setObjectName(u"telCheckLabel_6")

        self.verticalLayout_65.addWidget(self.telCheckLabel_6)

        self.telCheckLabel_7 = QLabel(self.checkGB_1)
        self.telCheckLabel_7.setObjectName(u"telCheckLabel_7")

        self.verticalLayout_65.addWidget(self.telCheckLabel_7)


        self.horizontalLayout_9.addLayout(self.verticalLayout_65)

        self.verticalLayout_66 = QVBoxLayout()
        self.verticalLayout_66.setObjectName(u"verticalLayout_66")
        self.telCheckLE_1 = QLineEdit(self.checkGB_1)
        self.telCheckLE_1.setObjectName(u"telCheckLE_1")
        sizePolicy4.setHeightForWidth(self.telCheckLE_1.sizePolicy().hasHeightForWidth())
        self.telCheckLE_1.setSizePolicy(sizePolicy4)
        self.telCheckLE_1.setMinimumSize(QSize(200, 0))

        self.verticalLayout_66.addWidget(self.telCheckLE_1)

        self.telCheckLE_2 = QLineEdit(self.checkGB_1)
        self.telCheckLE_2.setObjectName(u"telCheckLE_2")
        sizePolicy4.setHeightForWidth(self.telCheckLE_2.sizePolicy().hasHeightForWidth())
        self.telCheckLE_2.setSizePolicy(sizePolicy4)
        self.telCheckLE_2.setMinimumSize(QSize(200, 0))

        self.verticalLayout_66.addWidget(self.telCheckLE_2)

        self.telCheckLE_3 = QLineEdit(self.checkGB_1)
        self.telCheckLE_3.setObjectName(u"telCheckLE_3")
        sizePolicy4.setHeightForWidth(self.telCheckLE_3.sizePolicy().hasHeightForWidth())
        self.telCheckLE_3.setSizePolicy(sizePolicy4)
        self.telCheckLE_3.setMinimumSize(QSize(200, 0))

        self.verticalLayout_66.addWidget(self.telCheckLE_3)

        self.telCheckLE_4 = QLineEdit(self.checkGB_1)
        self.telCheckLE_4.setObjectName(u"telCheckLE_4")
        sizePolicy4.setHeightForWidth(self.telCheckLE_4.sizePolicy().hasHeightForWidth())
        self.telCheckLE_4.setSizePolicy(sizePolicy4)
        self.telCheckLE_4.setMinimumSize(QSize(200, 0))

        self.verticalLayout_66.addWidget(self.telCheckLE_4)

        self.telCheckLE_5 = QLineEdit(self.checkGB_1)
        self.telCheckLE_5.setObjectName(u"telCheckLE_5")
        sizePolicy4.setHeightForWidth(self.telCheckLE_5.sizePolicy().hasHeightForWidth())
        self.telCheckLE_5.setSizePolicy(sizePolicy4)
        self.telCheckLE_5.setMinimumSize(QSize(200, 0))

        self.verticalLayout_66.addWidget(self.telCheckLE_5)

        self.telCheckLE_6 = QLineEdit(self.checkGB_1)
        self.telCheckLE_6.setObjectName(u"telCheckLE_6")
        sizePolicy4.setHeightForWidth(self.telCheckLE_6.sizePolicy().hasHeightForWidth())
        self.telCheckLE_6.setSizePolicy(sizePolicy4)
        self.telCheckLE_6.setMinimumSize(QSize(200, 0))

        self.verticalLayout_66.addWidget(self.telCheckLE_6)

        self.telCheckLE_7 = QLineEdit(self.checkGB_1)
        self.telCheckLE_7.setObjectName(u"telCheckLE_7")
        sizePolicy4.setHeightForWidth(self.telCheckLE_7.sizePolicy().hasHeightForWidth())
        self.telCheckLE_7.setSizePolicy(sizePolicy4)
        self.telCheckLE_7.setMinimumSize(QSize(200, 0))

        self.verticalLayout_66.addWidget(self.telCheckLE_7)


        self.horizontalLayout_9.addLayout(self.verticalLayout_66)


        self.horizontalLayout_39.addWidget(self.checkGB_1)

        self.checkGB_2 = QGroupBox(self.telGB)
        self.checkGB_2.setObjectName(u"checkGB_2")
        self.horizontalLayout_11 = QHBoxLayout(self.checkGB_2)
        self.horizontalLayout_11.setObjectName(u"horizontalLayout_11")
        self.verticalLayout_67 = QVBoxLayout()
        self.verticalLayout_67.setObjectName(u"verticalLayout_67")
        self.telCheckLabel_8 = QLabel(self.checkGB_2)
        self.telCheckLabel_8.setObjectName(u"telCheckLabel_8")

        self.verticalLayout_67.addWidget(self.telCheckLabel_8)

        self.telCheckLabel_9 = QLabel(self.checkGB_2)
        self.telCheckLabel_9.setObjectName(u"telCheckLabel_9")

        self.verticalLayout_67.addWidget(self.telCheckLabel_9)

        self.telCheckLabel_10 = QLabel(self.checkGB_2)
        self.telCheckLabel_10.setObjectName(u"telCheckLabel_10")

        self.verticalLayout_67.addWidget(self.telCheckLabel_10)

        self.telCheckLabel_11 = QLabel(self.checkGB_2)
        self.telCheckLabel_11.setObjectName(u"telCheckLabel_11")

        self.verticalLayout_67.addWidget(self.telCheckLabel_11)

        self.telCheckLabel_12 = QLabel(self.checkGB_2)
        self.telCheckLabel_12.setObjectName(u"telCheckLabel_12")

        self.verticalLayout_67.addWidget(self.telCheckLabel_12)

        self.telCheckLabel_13 = QLabel(self.checkGB_2)
        self.telCheckLabel_13.setObjectName(u"telCheckLabel_13")

        self.verticalLayout_67.addWidget(self.telCheckLabel_13)

        self.telCheckLabel_14 = QLabel(self.checkGB_2)
        self.telCheckLabel_14.setObjectName(u"telCheckLabel_14")

        self.verticalLayout_67.addWidget(self.telCheckLabel_14)


        self.horizontalLayout_11.addLayout(self.verticalLayout_67)

        self.verticalLayout_68 = QVBoxLayout()
        self.verticalLayout_68.setObjectName(u"verticalLayout_68")
        self.telCheckLE_8 = QLineEdit(self.checkGB_2)
        self.telCheckLE_8.setObjectName(u"telCheckLE_8")
        sizePolicy4.setHeightForWidth(self.telCheckLE_8.sizePolicy().hasHeightForWidth())
        self.telCheckLE_8.setSizePolicy(sizePolicy4)
        self.telCheckLE_8.setMinimumSize(QSize(200, 0))

        self.verticalLayout_68.addWidget(self.telCheckLE_8)

        self.telCheckLE_9 = QLineEdit(self.checkGB_2)
        self.telCheckLE_9.setObjectName(u"telCheckLE_9")
        sizePolicy4.setHeightForWidth(self.telCheckLE_9.sizePolicy().hasHeightForWidth())
        self.telCheckLE_9.setSizePolicy(sizePolicy4)
        self.telCheckLE_9.setMinimumSize(QSize(200, 0))

        self.verticalLayout_68.addWidget(self.telCheckLE_9)

        self.telCheckLE_10 = QLineEdit(self.checkGB_2)
        self.telCheckLE_10.setObjectName(u"telCheckLE_10")
        sizePolicy4.setHeightForWidth(self.telCheckLE_10.sizePolicy().hasHeightForWidth())
        self.telCheckLE_10.setSizePolicy(sizePolicy4)
        self.telCheckLE_10.setMinimumSize(QSize(200, 0))

        self.verticalLayout_68.addWidget(self.telCheckLE_10)

        self.telCheckLE_11 = QLineEdit(self.checkGB_2)
        self.telCheckLE_11.setObjectName(u"telCheckLE_11")
        sizePolicy4.setHeightForWidth(self.telCheckLE_11.sizePolicy().hasHeightForWidth())
        self.telCheckLE_11.setSizePolicy(sizePolicy4)
        self.telCheckLE_11.setMinimumSize(QSize(200, 0))

        self.verticalLayout_68.addWidget(self.telCheckLE_11)

        self.telCheckLE_12 = QLineEdit(self.checkGB_2)
        self.telCheckLE_12.setObjectName(u"telCheckLE_12")
        sizePolicy4.setHeightForWidth(self.telCheckLE_12.sizePolicy().hasHeightForWidth())
        self.telCheckLE_12.setSizePolicy(sizePolicy4)
        self.telCheckLE_12.setMinimumSize(QSize(200, 0))

        self.verticalLayout_68.addWidget(self.telCheckLE_12)

        self.telCheckLE_13 = QLineEdit(self.checkGB_2)
        self.telCheckLE_13.setObjectName(u"telCheckLE_13")
        sizePolicy4.setHeightForWidth(self.telCheckLE_13.sizePolicy().hasHeightForWidth())
        self.telCheckLE_13.setSizePolicy(sizePolicy4)
        self.telCheckLE_13.setMinimumSize(QSize(200, 0))

        self.verticalLayout_68.addWidget(self.telCheckLE_13)

        self.telCheckLE_14 = QLineEdit(self.checkGB_2)
        self.telCheckLE_14.setObjectName(u"telCheckLE_14")
        sizePolicy4.setHeightForWidth(self.telCheckLE_14.sizePolicy().hasHeightForWidth())
        self.telCheckLE_14.setSizePolicy(sizePolicy4)
        self.telCheckLE_14.setMinimumSize(QSize(200, 0))

        self.verticalLayout_68.addWidget(self.telCheckLE_14)


        self.horizontalLayout_11.addLayout(self.verticalLayout_68)


        self.horizontalLayout_39.addWidget(self.checkGB_2)

        self.checkGB_3 = QGroupBox(self.telGB)
        self.checkGB_3.setObjectName(u"checkGB_3")
        self.horizontalLayout_10 = QHBoxLayout(self.checkGB_3)
        self.horizontalLayout_10.setObjectName(u"horizontalLayout_10")
        self.verticalLayout_70 = QVBoxLayout()
        self.verticalLayout_70.setObjectName(u"verticalLayout_70")
        self.telCheckLabel_15 = QLabel(self.checkGB_3)
        self.telCheckLabel_15.setObjectName(u"telCheckLabel_15")

        self.verticalLayout_70.addWidget(self.telCheckLabel_15)

        self.telCheckLabel_16 = QLabel(self.checkGB_3)
        self.telCheckLabel_16.setObjectName(u"telCheckLabel_16")

        self.verticalLayout_70.addWidget(self.telCheckLabel_16)

        self.telCheckLabel_17 = QLabel(self.checkGB_3)
        self.telCheckLabel_17.setObjectName(u"telCheckLabel_17")

        self.verticalLayout_70.addWidget(self.telCheckLabel_17)

        self.telCheckLabel_18 = QLabel(self.checkGB_3)
        self.telCheckLabel_18.setObjectName(u"telCheckLabel_18")

        self.verticalLayout_70.addWidget(self.telCheckLabel_18)

        self.telCheckLabel_19 = QLabel(self.checkGB_3)
        self.telCheckLabel_19.setObjectName(u"telCheckLabel_19")

        self.verticalLayout_70.addWidget(self.telCheckLabel_19)

        self.telCheckLabel_20 = QLabel(self.checkGB_3)
        self.telCheckLabel_20.setObjectName(u"telCheckLabel_20")

        self.verticalLayout_70.addWidget(self.telCheckLabel_20)

        self.telCheckLabel_21 = QLabel(self.checkGB_3)
        self.telCheckLabel_21.setObjectName(u"telCheckLabel_21")

        self.verticalLayout_70.addWidget(self.telCheckLabel_21)


        self.horizontalLayout_10.addLayout(self.verticalLayout_70)

        self.verticalLayout_69 = QVBoxLayout()
        self.verticalLayout_69.setObjectName(u"verticalLayout_69")
        self.telCheckLE_15 = QLineEdit(self.checkGB_3)
        self.telCheckLE_15.setObjectName(u"telCheckLE_15")
        sizePolicy4.setHeightForWidth(self.telCheckLE_15.sizePolicy().hasHeightForWidth())
        self.telCheckLE_15.setSizePolicy(sizePolicy4)
        self.telCheckLE_15.setMinimumSize(QSize(200, 0))

        self.verticalLayout_69.addWidget(self.telCheckLE_15)

        self.telCheckLE_16 = QLineEdit(self.checkGB_3)
        self.telCheckLE_16.setObjectName(u"telCheckLE_16")
        sizePolicy4.setHeightForWidth(self.telCheckLE_16.sizePolicy().hasHeightForWidth())
        self.telCheckLE_16.setSizePolicy(sizePolicy4)
        self.telCheckLE_16.setMinimumSize(QSize(200, 0))

        self.verticalLayout_69.addWidget(self.telCheckLE_16)

        self.telCheckLE_17 = QLineEdit(self.checkGB_3)
        self.telCheckLE_17.setObjectName(u"telCheckLE_17")
        sizePolicy4.setHeightForWidth(self.telCheckLE_17.sizePolicy().hasHeightForWidth())
        self.telCheckLE_17.setSizePolicy(sizePolicy4)
        self.telCheckLE_17.setMinimumSize(QSize(200, 0))

        self.verticalLayout_69.addWidget(self.telCheckLE_17)

        self.telCheckLE_18 = QLineEdit(self.checkGB_3)
        self.telCheckLE_18.setObjectName(u"telCheckLE_18")
        sizePolicy4.setHeightForWidth(self.telCheckLE_18.sizePolicy().hasHeightForWidth())
        self.telCheckLE_18.setSizePolicy(sizePolicy4)
        self.telCheckLE_18.setMinimumSize(QSize(200, 0))

        self.verticalLayout_69.addWidget(self.telCheckLE_18)

        self.telCheckLE_19 = QLineEdit(self.checkGB_3)
        self.telCheckLE_19.setObjectName(u"telCheckLE_19")
        sizePolicy4.setHeightForWidth(self.telCheckLE_19.sizePolicy().hasHeightForWidth())
        self.telCheckLE_19.setSizePolicy(sizePolicy4)
        self.telCheckLE_19.setMinimumSize(QSize(200, 0))

        self.verticalLayout_69.addWidget(self.telCheckLE_19)

        self.telCheckLE_20 = QLineEdit(self.checkGB_3)
        self.telCheckLE_20.setObjectName(u"telCheckLE_20")
        sizePolicy4.setHeightForWidth(self.telCheckLE_20.sizePolicy().hasHeightForWidth())
        self.telCheckLE_20.setSizePolicy(sizePolicy4)
        self.telCheckLE_20.setMinimumSize(QSize(200, 0))

        self.verticalLayout_69.addWidget(self.telCheckLE_20)

        self.telCheckLE_21 = QLineEdit(self.checkGB_3)
        self.telCheckLE_21.setObjectName(u"telCheckLE_21")
        sizePolicy4.setHeightForWidth(self.telCheckLE_21.sizePolicy().hasHeightForWidth())
        self.telCheckLE_21.setSizePolicy(sizePolicy4)
        self.telCheckLE_21.setMinimumSize(QSize(200, 0))

        self.verticalLayout_69.addWidget(self.telCheckLE_21)


        self.horizontalLayout_10.addLayout(self.verticalLayout_69)


        self.horizontalLayout_39.addWidget(self.checkGB_3)


        self.gridLayout_3.addWidget(self.telGB, 2, 1, 1, 1)


        self.verticalLayout_16.addWidget(self.auditFrame)

        self.mainStackedWidget.addWidget(self.auditsPage)
        self.page = QWidget()
        self.page.setObjectName(u"page")
        self.mainStackedWidget.addWidget(self.page)

        self.verticalLayout.addWidget(self.mainStackedWidget)

        self.horizontalSpacer_2 = QSpacerItem(40, 20, QSizePolicy.Policy.Expanding, QSizePolicy.Policy.Minimum)

        self.verticalLayout.addItem(self.horizontalSpacer_2)

        self.horizontalSpacer_3 = QSpacerItem(40, 20, QSizePolicy.Policy.Expanding, QSizePolicy.Policy.Minimum)

        self.verticalLayout.addItem(self.horizontalSpacer_3)

        MainWindow.setCentralWidget(self.centralwidget)
        self.menubar = QMenuBar(MainWindow)
        self.menubar.setObjectName(u"menubar")
        self.menubar.setGeometry(QRect(0, 0, 1745, 28))
        MainWindow.setMenuBar(self.menubar)
        self.statusbar = QStatusBar(MainWindow)
        self.statusbar.setObjectName(u"statusbar")
        MainWindow.setStatusBar(self.statusbar)

        self.retranslateUi(MainWindow)

        self.mainStackedWidget.setCurrentIndex(2)
        self.LLMstackedWidget.setCurrentIndex(1)
        self.transformsStackedWidget.setCurrentIndex(0)
        self.inputPhaseStackedWidget.setCurrentIndex(0)
        self.identityPhaseStackedWidget.setCurrentIndex(0)
        self.inceptionPhaseStackedWidget.setCurrentIndex(0)


        QMetaObject.connectSlotsByName(MainWindow)
    # setupUi

    def retranslateUi(self, MainWindow):
        MainWindow.setWindowTitle("")
        self.TemplateEditorBtn.setText(QCoreApplication.translate("MainWindow", u"Template Editor", None))
        self.LLMConfigPushBtn.setText(QCoreApplication.translate("MainWindow", u"LLMConfig", None))
        self.EngineBtn.setText(QCoreApplication.translate("MainWindow", u"Engine", None))
        self.AuditsBtn.setText(QCoreApplication.translate("MainWindow", u"Audits", None))
        self.DashboardBtn.setText(QCoreApplication.translate("MainWindow", u"Dashboard", None))
        self.decompositionGB.setTitle(QCoreApplication.translate("MainWindow", u"Decomposition ", None))
        self.dash_ArcsLabel.setText(QCoreApplication.translate("MainWindow", u"7 Rhetorical Arcs", None))
        self.dash_UserInputLabel.setText(QCoreApplication.translate("MainWindow", u"User Input", None))
        self.postProGB.setTitle(QCoreApplication.translate("MainWindow", u"Synthesis", None))
        self.dash_TriadicSummationsLabel.setText(QCoreApplication.translate("MainWindow", u"Triadic Summations", None))
        self.pipelineBreakerGB.setTitle(QCoreApplication.translate("MainWindow", u"Pipeline  Breaker Panel", None))
        self.compostionGB.setTitle(QCoreApplication.translate("MainWindow", u"Composition", None))
        self.controlsGB.setTitle(QCoreApplication.translate("MainWindow", u"Controls", None))
        self.dash_ArcRB_1.setText(QCoreApplication.translate("MainWindow", u"Arc 1", None))
        self.dash_ArcRB_2.setText(QCoreApplication.translate("MainWindow", u"Arc 2", None))
        self.dash_ArcRB_3.setText(QCoreApplication.translate("MainWindow", u"Arc 3", None))
        self.dash_ArcRB_4.setText(QCoreApplication.translate("MainWindow", u"Arc 4", None))
        self.dash_ArcRB_5.setText(QCoreApplication.translate("MainWindow", u"Arc 5", None))
        self.dash_ArcRB_6.setText(QCoreApplication.translate("MainWindow", u"Arc 6", None))
        self.dash_ArcRB_7.setText(QCoreApplication.translate("MainWindow", u"Arc 7", None))
        self.triadCompletionLightsGB.setTitle(QCoreApplication.translate("MainWindow", u"Triaic Summations", None))
        self.idiotLight_Arc_1.setText("")
        self.idiotLight_Arc_2.setText("")
        self.idiotLight_Arc_3.setText("")
        self.idiotLight_Arc_4.setText("")
        self.idiotLight_Arc_5.setText("")
        self.idiotLight_Arc_6.setText("")
        self.idiotLight_Arc_7.setText("")
        self.idiotLight_Arc_8.setText("")
        self.idiotLight_Arc_9.setText("")
        self.idiotLight_Arc_10.setText("")
        self.idiotLight_Arc_11.setText("")
        self.idiotLight_Arc_12.setText("")
        self.idiotLight_Arc_13.setText("")
        self.idiotLight_Arc_14.setText("")
        self.idiotLight_Arc_15.setText("")
        self.idiotLight_Arc_16.setText("")
        self.idiotLight_Arc_17.setText("")
        self.idiotLight_Arc_18.setText("")
        self.idiotLight_Arc_19.setText("")
        self.idiotLight_Arc_20.setText("")
        self.idiotLight_Arc_21.setText("")
        self.dash_ComputeFirstTriadBtn.setText(QCoreApplication.translate("MainWindow", u"First", None))
        self.dash_ComputeSecondTriadBtn.setText(QCoreApplication.translate("MainWindow", u"Second ", None))
        self.dash_ComputeThirdTriadBtn.setText(QCoreApplication.translate("MainWindow", u"Third ", None))
        self.dash_runInferenceBtn.setText(QCoreApplication.translate("MainWindow", u"Run Inference", None))
        self.tokensGB.setTitle(QCoreApplication.translate("MainWindow", u"Tokenization Statistics", None))
        self.perCall_Label.setText(QCoreApplication.translate("MainWindow", u"     Per Call", None))
        self.sessTotal_Label.setText(QCoreApplication.translate("MainWindow", u"Session Total", None))
        self.setQuotaBtn.setText(QCoreApplication.translate("MainWindow", u"Set Qouta's", None))
        self.usedTokensLabel.setText(QCoreApplication.translate("MainWindow", u" Tokens Used This Call", None))
        self.sessUseLabel.setText(QCoreApplication.translate("MainWindow", u"Session Token Usage/Qouta", None))
        self.resetStatsBtn.setText(QCoreApplication.translate("MainWindow", u"Reset Qouta Counts", None))
        self.inputModelGB.setTitle(QCoreApplication.translate("MainWindow", u"Input Model Statistics", None))
        self.topP_Label_IM.setText(QCoreApplication.translate("MainWindow", u"Top-P", None))
        self.printPreview_IM.setText(QCoreApplication.translate("MainWindow", u"Snapshot", None))
        self.modelStatusLabel_IM.setText(QCoreApplication.translate("MainWindow", u"Model Status", None))
        self.freqqLabel_IM.setText(QCoreApplication.translate("MainWindow", u"Frequency Penalty", None))
        self.StatusLabel_IM.setText("")
        self.tuningBtn_IM.setText(QCoreApplication.translate("MainWindow", u"Tuning", None))
        self.presLabel_IM.setText(QCoreApplication.translate("MainWindow", u"Presense Penalty", None))
        self.tempLabel_IM.setText(QCoreApplication.translate("MainWindow", u"Temperture", None))
        self.topK_Label_IM.setText(QCoreApplication.translate("MainWindow", u"Top-K", None))
        self.modelGB_Con.setTitle(QCoreApplication.translate("MainWindow", u"Conductor Model Statistics", None))
        self.modelStatusLabel_Con.setText(QCoreApplication.translate("MainWindow", u"Model Status", None))
        self.topP_Label_Con.setText(QCoreApplication.translate("MainWindow", u"Top-P", None))
        self.freqLabel_Con.setText(QCoreApplication.translate("MainWindow", u"Frequency Penalty", None))
        self.tempLabel_Con.setText(QCoreApplication.translate("MainWindow", u"Temperture", None))
        self.presLabel_Con.setText(QCoreApplication.translate("MainWindow", u"Presense Penalty", None))
        self.topK_Label_Con.setText(QCoreApplication.translate("MainWindow", u"Top-K", None))
        self.tuningBtn_Con.setText(QCoreApplication.translate("MainWindow", u"Tuning", None))
        self.printPreviewBtn_Con.setText(QCoreApplication.translate("MainWindow", u"Snapshot", None))
        self.StatusLabel_Con.setText("")
        self.OutputMiodelGB.setTitle(QCoreApplication.translate("MainWindow", u"Output Model Statistics", None))
        self.modelStatusLabel_OM.setText(QCoreApplication.translate("MainWindow", u"Model Status", None))
        self.topP_Label_OM.setText(QCoreApplication.translate("MainWindow", u"Top-P", None))
        self.freqLabel_OM.setText(QCoreApplication.translate("MainWindow", u"Frequency Penalty", None))
        self.tempLabel_OM.setText(QCoreApplication.translate("MainWindow", u"Temperture", None))
        self.presLabel_OM.setText(QCoreApplication.translate("MainWindow", u"Presense Penalty", None))
        self.topK_Label_OM.setText(QCoreApplication.translate("MainWindow", u"Top-K", None))
        self.tuningBtn_OM.setText(QCoreApplication.translate("MainWindow", u"Tuning", None))
        self.printPreviewBtn_OM.setText(QCoreApplication.translate("MainWindow", u"Snapshot", None))
        self.StatusLabel_OM.setText("")
        self.decomposer_NameLabel.setText(QCoreApplication.translate("MainWindow", u"Agent Name:", None))
        self.decomposer_ID_Label.setText(QCoreApplication.translate("MainWindow", u"Agent ID", None))
        self.decomposer_API_KeyLabel.setText(QCoreApplication.translate("MainWindow", u"API_Key", None))
        self.decomposer_API_SaveBtn.setText(QCoreApplication.translate("MainWindow", u"Save", None))
        self.decomposer_SystemPromptLabel.setText(QCoreApplication.translate("MainWindow", u"System Prompt", None))
        self.decomposer_UserInputTE.setPlaceholderText(QCoreApplication.translate("MainWindow", u"Write something here..", None))
        self.decomposer_UpdateBtn.setText(QCoreApplication.translate("MainWindow", u"Update", None))
        self.decomposer_cancelBtn.setText(QCoreApplication.translate("MainWindow", u"Cancel", None))
        self.decomposer_SendBtn.setText(QCoreApplication.translate("MainWindow", u"Send", None))
        self.decomposer_ControllerGB.setTitle(QCoreApplication.translate("MainWindow", u"Decomposer Settings", None))
        self.inputLLM_ModelLabel.setText(QCoreApplication.translate("MainWindow", u"Model", None))
        self.inputLLM_ModelCB.setItemText(0, QCoreApplication.translate("MainWindow", u"GPT-4o", None))
        self.inputLLM_ModelCB.setItemText(1, QCoreApplication.translate("MainWindow", u"Claude 3", None))
        self.inputLLM_ModelCB.setItemText(2, QCoreApplication.translate("MainWindow", u"Command R+", None))
        self.inputLLM_ModelCB.setItemText(3, QCoreApplication.translate("MainWindow", u"Gemini", None))
        self.inputLLM_ModelCB.setItemText(4, QCoreApplication.translate("MainWindow", u"Mistral", None))
        self.inputLLM_ModelCB.setItemText(5, QCoreApplication.translate("MainWindow", u"Mistral 7B", None))
        self.inputLLM_ModelCB.setItemText(6, QCoreApplication.translate("MainWindow", u"LLaMA 2", None))
        self.inputLLM_ModelCB.setItemText(7, QCoreApplication.translate("MainWindow", u"GPT-3", None))
        self.inputLLM_ModelCB.setItemText(8, QCoreApplication.translate("MainWindow", u"Nous Hermes", None))
        self.inputLLM_ModelCB.setItemText(9, QCoreApplication.translate("MainWindow", u"Mythomax", None))

        self.inputOpenAI_GB.setTitle(QCoreApplication.translate("MainWindow", u"OpenAI ", None))
        self.inputLLM_TemperatureLabel.setText(QCoreApplication.translate("MainWindow", u"Temperature", None))
        self.inputLLM_PresencePenaltyLabel.setText(QCoreApplication.translate("MainWindow", u"Presence Penalty", None))
        self.inputLLM_FrequencyPenaltyLabel.setText(QCoreApplication.translate("MainWindow", u"Frequency Penalty", None))
        self.inputLLM_TopPLabel.setText(QCoreApplication.translate("MainWindow", u"Top-P", None))
        self.inputLLM_TopKLabel.setText(QCoreApplication.translate("MainWindow", u"Top-K", None))
        self.inputLLM_MinTokensLabel.setText(QCoreApplication.translate("MainWindow", u"Min. Tokens", None))
        self.inputLLM_MaxTokensLabel.setText(QCoreApplication.translate("MainWindow", u"Max. Tokens", None))
        self.decomposer_PingBtn.setText(QCoreApplication.translate("MainWindow", u"Verify Connection", None))
        self.middleAgent_NameLabel.setText(QCoreApplication.translate("MainWindow", u"Agent Name", None))
        self.middleAgent_AgentID_Label.setText(QCoreApplication.translate("MainWindow", u"Agent ID", None))
        self.middleAgent_API_KeyLabel.setText(QCoreApplication.translate("MainWindow", u"API_Key", None))
        self.middleAgentAPI_SaveBtn.setText(QCoreApplication.translate("MainWindow", u"Save", None))
        self.middleAgent_PromptLabel.setText(QCoreApplication.translate("MainWindow", u"System Prompt", None))
        self.middleAgent_updateBtn.setText(QCoreApplication.translate("MainWindow", u"Update", None))
        self.middleAgent_cancelBtn.setText(QCoreApplication.translate("MainWindow", u"Cancel", None))
        self.middleAgent_SendBtn.setText(QCoreApplication.translate("MainWindow", u"Send", None))
        self.middleAgent_ControllerGB.setTitle(QCoreApplication.translate("MainWindow", u"Middle Agent Settings", None))
        self.middleAgent_ModelLabel.setText(QCoreApplication.translate("MainWindow", u"Model", None))
        self.middleAgent_ModelCB.setItemText(0, QCoreApplication.translate("MainWindow", u"GPT-4o", None))
        self.middleAgent_ModelCB.setItemText(1, QCoreApplication.translate("MainWindow", u"Claude 3", None))
        self.middleAgent_ModelCB.setItemText(2, QCoreApplication.translate("MainWindow", u"Command R+", None))
        self.middleAgent_ModelCB.setItemText(3, QCoreApplication.translate("MainWindow", u"Gemini", None))
        self.middleAgent_ModelCB.setItemText(4, QCoreApplication.translate("MainWindow", u"Mistral", None))
        self.middleAgent_ModelCB.setItemText(5, QCoreApplication.translate("MainWindow", u"Mistral 7B", None))
        self.middleAgent_ModelCB.setItemText(6, QCoreApplication.translate("MainWindow", u"LLaMA 2", None))
        self.middleAgent_ModelCB.setItemText(7, QCoreApplication.translate("MainWindow", u"GPT-3", None))
        self.middleAgent_ModelCB.setItemText(8, QCoreApplication.translate("MainWindow", u"Nous Hermes", None))
        self.middleAgent_ModelCB.setItemText(9, QCoreApplication.translate("MainWindow", u"Mythomax", None))

        self.inputOpenAI_GB_3.setTitle(QCoreApplication.translate("MainWindow", u"OpenAI ", None))
        self.temperatureLabel_3.setText(QCoreApplication.translate("MainWindow", u"Temperature", None))
        self.middleAgent_TemperatureLabel.setText(QCoreApplication.translate("MainWindow", u"Presence Penalty", None))
        self.middleAgent_FrequencyPenaltyLabel.setText(QCoreApplication.translate("MainWindow", u"Frequency Penalty", None))
        self.middleAgent_TopPLabel.setText(QCoreApplication.translate("MainWindow", u"Top-P", None))
        self.middleAgent_TopKLabel.setText(QCoreApplication.translate("MainWindow", u"Top-K", None))
        self.middleAgent_MinTokensLabel.setText(QCoreApplication.translate("MainWindow", u"Min. Tokens", None))
        self.middleAgent_MaxTokensLabel.setText(QCoreApplication.translate("MainWindow", u"Max. Tokens", None))
        self.middleAgent_PingBtn.setText(QCoreApplication.translate("MainWindow", u"Verify Connection", None))
        self.conductor_NameLabel.setText(QCoreApplication.translate("MainWindow", u"Agent Name", None))
        self.conductor_AgentID_Label.setText(QCoreApplication.translate("MainWindow", u"Agent ID", None))
        self.conductor_API_KeyLabel.setText(QCoreApplication.translate("MainWindow", u"API_Key", None))
        self.conductorAPI_SaveBtn.setText(QCoreApplication.translate("MainWindow", u"Save", None))
        self.conductor_RoleLAbel.setText(QCoreApplication.translate("MainWindow", u"Role", None))
        self.conductor_SystemPromptLabel.setText(QCoreApplication.translate("MainWindow", u"System Prompt", None))
        self.conductor_UpdateBtn.setText(QCoreApplication.translate("MainWindow", u"Update", None))
        self.conductor_CancelBtn.setText(QCoreApplication.translate("MainWindow", u"Cancel", None))
        self.conductor_SendBtn.setText(QCoreApplication.translate("MainWindow", u"Send", None))
        self.conductor_ControllerGB.setTitle(QCoreApplication.translate("MainWindow", u"Conductor Settings", None))
        self.conductor_ModelLabel.setText(QCoreApplication.translate("MainWindow", u"Output Model", None))
        self.conductor_ModelCB.setItemText(0, QCoreApplication.translate("MainWindow", u"GPT-4o", None))
        self.conductor_ModelCB.setItemText(1, QCoreApplication.translate("MainWindow", u"Claude 3", None))
        self.conductor_ModelCB.setItemText(2, QCoreApplication.translate("MainWindow", u"Command R+", None))
        self.conductor_ModelCB.setItemText(3, QCoreApplication.translate("MainWindow", u"Gemini", None))
        self.conductor_ModelCB.setItemText(4, QCoreApplication.translate("MainWindow", u"Mistral", None))
        self.conductor_ModelCB.setItemText(5, QCoreApplication.translate("MainWindow", u"Mistral 7B", None))
        self.conductor_ModelCB.setItemText(6, QCoreApplication.translate("MainWindow", u"LLaMA 2", None))
        self.conductor_ModelCB.setItemText(7, QCoreApplication.translate("MainWindow", u"GPT-3", None))
        self.conductor_ModelCB.setItemText(8, QCoreApplication.translate("MainWindow", u"Nous Hermes", None))
        self.conductor_ModelCB.setItemText(9, QCoreApplication.translate("MainWindow", u"Mythomax", None))

        self.conductor_OpenAI_GB.setTitle(QCoreApplication.translate("MainWindow", u"OpenAI ", None))
        self.conductor_TemperatureLabel.setText(QCoreApplication.translate("MainWindow", u"Temperature", None))
        self.conductor_PresencePenaltyLabel.setText(QCoreApplication.translate("MainWindow", u"Presence Penalty", None))
        self.conductor_FrequencPenaltyLabel.setText(QCoreApplication.translate("MainWindow", u"Frequency Penalty", None))
        self.conductor_TopPLabel.setText(QCoreApplication.translate("MainWindow", u"Top-P", None))
        self.conductor_TopKLabel.setText(QCoreApplication.translate("MainWindow", u"Top-K", None))
        self.conductor_MinTokensLabel.setText(QCoreApplication.translate("MainWindow", u"Min. Tokens", None))
        self.conductor_MaxTokensLabel.setText(QCoreApplication.translate("MainWindow", u"Max. Tokens", None))
        self.conductor_PingBtn.setText(QCoreApplication.translate("MainWindow", u"Output Ping", None))
        self.bgLabel.setText("")
        self.inputPhase_UploadImageLabel.setText("")
        self.identityPhase_UploadImageLabel.setText("")
        self.inceptionPhase_UploadImageLabel.setText("")
        self.resetBtn.setText(QCoreApplication.translate("MainWindow", u"Reset", None))
        self.loadDatasetBtn.setText(QCoreApplication.translate("MainWindow", u"Load", None))
        self.saveBtn.setText(QCoreApplication.translate("MainWindow", u"Save", None))
        self.applyBtn.setText(QCoreApplication.translate("MainWindow", u"Apply Dataset", None))
        self.templateNameLabel.setText(QCoreApplication.translate("MainWindow", u"Template Name:", None))
        self.descriptionLabel.setText(QCoreApplication.translate("MainWindow", u"Description:", None))
        self.classificationLabel.setText(QCoreApplication.translate("MainWindow", u"Classification:", None))
        self.departmentLabel.setText(QCoreApplication.translate("MainWindow", u"Department:", None))
        self.authorLabel.setText(QCoreApplication.translate("MainWindow", u"Author:", None))
        self.notesLabel.setText(QCoreApplication.translate("MainWindow", u"Notes:", None))
        self.essenceLabel.setText(QCoreApplication.translate("MainWindow", u"Essence", None))
        self.formLabel.setText(QCoreApplication.translate("MainWindow", u"Form", None))
        self.actionLabel.setText(QCoreApplication.translate("MainWindow", u"Action", None))
        self.frameLabel.setText(QCoreApplication.translate("MainWindow", u"Frame", None))
        self.intentLabel.setText(QCoreApplication.translate("MainWindow", u"Intent", None))
        self.relationalArcLabel.setText(QCoreApplication.translate("MainWindow", u"Relation", None))
        self.valueLabel.setText(QCoreApplication.translate("MainWindow", u"Value", None))
        self.transformsGB.setTitle(QCoreApplication.translate("MainWindow", u"G-ynthetic 3 x 9 x 63 (^3) Big Block", None))
        self.phasesGB.setTitle(QCoreApplication.translate("MainWindow", u"Phases", None))
        self.inputPhaseBtn.setText(QCoreApplication.translate("MainWindow", u"Input", None))
        self.identityPhaseBtn.setText(QCoreApplication.translate("MainWindow", u"Identity", None))
        self.inceptionPhaseBtn.setText(QCoreApplication.translate("MainWindow", u"Inception", None))
        self.inputPhase_TransformDynamicLabel.setText("")
        self.identityPhase_TransformDynamicLabel.setText("")
        self.inceptionPhase_TransformDynamicLabel.setText("")
        self.modifiersGB.setTitle("")
        self.arcsRB_GB.setTitle(QCoreApplication.translate("MainWindow", u"Arcs", None))
        self.firstArcRB.setText(QCoreApplication.translate("MainWindow", u"1", None))
        self.secondArcRB.setText(QCoreApplication.translate("MainWindow", u"2", None))
        self.thirdArcRB.setText(QCoreApplication.translate("MainWindow", u"3", None))
        self.fourthArcRB.setText(QCoreApplication.translate("MainWindow", u"4", None))
        self.fifthArcRB.setText(QCoreApplication.translate("MainWindow", u"5", None))
        self.sixthArcRB.setText(QCoreApplication.translate("MainWindow", u"6", None))
        self.seventhArcRB.setText(QCoreApplication.translate("MainWindow", u"7", None))
        self.triadBtnsGB.setTitle(QCoreApplication.translate("MainWindow", u"Triads", None))
        self.computeFirstTriadBtn.setText(QCoreApplication.translate("MainWindow", u"First", None))
        self.computeSecondTriadBtn.setText(QCoreApplication.translate("MainWindow", u"Second", None))
        self.computeThirdTriadBtn.setText(QCoreApplication.translate("MainWindow", u"Third", None))
        self.modifierInputGB.setTitle(QCoreApplication.translate("MainWindow", u"Input Modifier", None))
        self.modifierInputLabel.setText(QCoreApplication.translate("MainWindow", u"Placeholder", None))
        self.modifierInputCB.setItemText(0, "")
        self.modifierInputCB.setItemText(1, QCoreApplication.translate("MainWindow", u"Risk", None))
        self.modifierInputCB.setItemText(2, QCoreApplication.translate("MainWindow", u"Reward", None))
        self.modifierInputCB.setItemText(3, QCoreApplication.translate("MainWindow", u"Relation", None))

        self.modifierIdentityGB.setTitle(QCoreApplication.translate("MainWindow", u"Identity Modifier", None))
        self.modifierIdentityLabel.setText(QCoreApplication.translate("MainWindow", u"Placeholder", None))
        self.modifieridentityCB.setItemText(0, "")
        self.modifieridentityCB.setItemText(1, QCoreApplication.translate("MainWindow", u"Risk", None))
        self.modifieridentityCB.setItemText(2, QCoreApplication.translate("MainWindow", u"Reward", None))
        self.modifieridentityCB.setItemText(3, QCoreApplication.translate("MainWindow", u"Relation", None))

        self.modifierInceptionGB.setTitle(QCoreApplication.translate("MainWindow", u"Inception Modifier", None))
        self.modifierInceptionLabel.setText(QCoreApplication.translate("MainWindow", u"Placeholder", None))
        self.modifierInceptionCB.setItemText(0, "")
        self.modifierInceptionCB.setItemText(1, QCoreApplication.translate("MainWindow", u"Risk", None))
        self.modifierInceptionCB.setItemText(2, QCoreApplication.translate("MainWindow", u"Reward", None))
        self.modifierInceptionCB.setItemText(3, QCoreApplication.translate("MainWindow", u"Relation", None))

        self.pipelinesGB.setTitle("")
        self.pillarRanksGB.setTitle(QCoreApplication.translate("MainWindow", u"Ranks", None))
        self.processingPipelineGB.setTitle(QCoreApplication.translate("MainWindow", u"Processing Pipelines", None))
        self.inputPhaseGB.setTitle(QCoreApplication.translate("MainWindow", u"Input Phase", None))

        __sortingEnabled = self.inputPhasePage01_List.isSortingEnabled()
        self.inputPhasePage01_List.setSortingEnabled(False)
        ___qlistwidgetitem = self.inputPhasePage01_List.item(0)
        ___qlistwidgetitem.setText(QCoreApplication.translate("MainWindow", u"Input Pillar", None));
        ___qlistwidgetitem1 = self.inputPhasePage01_List.item(1)
        ___qlistwidgetitem1.setText(QCoreApplication.translate("MainWindow", u"placeholder_1", None));
        ___qlistwidgetitem2 = self.inputPhasePage01_List.item(2)
        ___qlistwidgetitem2.setText(QCoreApplication.translate("MainWindow", u"placeholder_2", None));
        ___qlistwidgetitem3 = self.inputPhasePage01_List.item(3)
        ___qlistwidgetitem3.setText(QCoreApplication.translate("MainWindow", u"placeholder_3", None));
        ___qlistwidgetitem4 = self.inputPhasePage01_List.item(4)
        ___qlistwidgetitem4.setText(QCoreApplication.translate("MainWindow", u"placeholder_4", None));
        ___qlistwidgetitem5 = self.inputPhasePage01_List.item(5)
        ___qlistwidgetitem5.setText(QCoreApplication.translate("MainWindow", u"placeholder_5", None));
        ___qlistwidgetitem6 = self.inputPhasePage01_List.item(6)
        ___qlistwidgetitem6.setText(QCoreApplication.translate("MainWindow", u"placeholder_6", None));
        ___qlistwidgetitem7 = self.inputPhasePage01_List.item(7)
        ___qlistwidgetitem7.setText(QCoreApplication.translate("MainWindow", u"placeholder_7", None));
        self.inputPhasePage01_List.setSortingEnabled(__sortingEnabled)


        __sortingEnabled1 = self.inputPhasePage02_List.isSortingEnabled()
        self.inputPhasePage02_List.setSortingEnabled(False)
        ___qlistwidgetitem8 = self.inputPhasePage02_List.item(0)
        ___qlistwidgetitem8.setText(QCoreApplication.translate("MainWindow", u"Identity Pillar", None));
        ___qlistwidgetitem9 = self.inputPhasePage02_List.item(1)
        ___qlistwidgetitem9.setText(QCoreApplication.translate("MainWindow", u"placeholder_1", None));
        ___qlistwidgetitem10 = self.inputPhasePage02_List.item(2)
        ___qlistwidgetitem10.setText(QCoreApplication.translate("MainWindow", u"placeholder_2", None));
        ___qlistwidgetitem11 = self.inputPhasePage02_List.item(3)
        ___qlistwidgetitem11.setText(QCoreApplication.translate("MainWindow", u"placeholder_3", None));
        ___qlistwidgetitem12 = self.inputPhasePage02_List.item(4)
        ___qlistwidgetitem12.setText(QCoreApplication.translate("MainWindow", u"placeholder_4", None));
        ___qlistwidgetitem13 = self.inputPhasePage02_List.item(5)
        ___qlistwidgetitem13.setText(QCoreApplication.translate("MainWindow", u"placeholder_5", None));
        ___qlistwidgetitem14 = self.inputPhasePage02_List.item(6)
        ___qlistwidgetitem14.setText(QCoreApplication.translate("MainWindow", u"placeholder_6", None));
        ___qlistwidgetitem15 = self.inputPhasePage02_List.item(7)
        ___qlistwidgetitem15.setText(QCoreApplication.translate("MainWindow", u"placeholder_7", None));
        self.inputPhasePage02_List.setSortingEnabled(__sortingEnabled1)


        __sortingEnabled2 = self.inputPhasePage03_List.isSortingEnabled()
        self.inputPhasePage03_List.setSortingEnabled(False)
        ___qlistwidgetitem16 = self.inputPhasePage03_List.item(0)
        ___qlistwidgetitem16.setText(QCoreApplication.translate("MainWindow", u"Inception Pillar", None));
        ___qlistwidgetitem17 = self.inputPhasePage03_List.item(1)
        ___qlistwidgetitem17.setText(QCoreApplication.translate("MainWindow", u"placeholder_1", None));
        ___qlistwidgetitem18 = self.inputPhasePage03_List.item(2)
        ___qlistwidgetitem18.setText(QCoreApplication.translate("MainWindow", u"placeholder_2", None));
        ___qlistwidgetitem19 = self.inputPhasePage03_List.item(3)
        ___qlistwidgetitem19.setText(QCoreApplication.translate("MainWindow", u"placeholder_3", None));
        ___qlistwidgetitem20 = self.inputPhasePage03_List.item(4)
        ___qlistwidgetitem20.setText(QCoreApplication.translate("MainWindow", u"placeholder_4", None));
        ___qlistwidgetitem21 = self.inputPhasePage03_List.item(5)
        ___qlistwidgetitem21.setText(QCoreApplication.translate("MainWindow", u"placeholder_5", None));
        ___qlistwidgetitem22 = self.inputPhasePage03_List.item(6)
        ___qlistwidgetitem22.setText(QCoreApplication.translate("MainWindow", u"placeholder_6", None));
        ___qlistwidgetitem23 = self.inputPhasePage03_List.item(7)
        ___qlistwidgetitem23.setText(QCoreApplication.translate("MainWindow", u"placeholder_7", None));
        self.inputPhasePage03_List.setSortingEnabled(__sortingEnabled2)

        self.inception_sensor_8.setText("")
        self.inception_sensor_9.setText("")
        self.inception_sensor_10.setText("")
        self.inception_sensor_11.setText("")
        self.inception_sensor_12.setText("")
        self.inception_sensor_13.setText("")
        self.inception_sensor_14.setText("")
        self.identityPhaseGB.setTitle(QCoreApplication.translate("MainWindow", u"Identity Phase", None))

        __sortingEnabled3 = self.identityPhasePage01_List.isSortingEnabled()
        self.identityPhasePage01_List.setSortingEnabled(False)
        ___qlistwidgetitem24 = self.identityPhasePage01_List.item(0)
        ___qlistwidgetitem24.setText(QCoreApplication.translate("MainWindow", u"Input Pillar", None));
        ___qlistwidgetitem25 = self.identityPhasePage01_List.item(1)
        ___qlistwidgetitem25.setText(QCoreApplication.translate("MainWindow", u"placeholder_1", None));
        ___qlistwidgetitem26 = self.identityPhasePage01_List.item(2)
        ___qlistwidgetitem26.setText(QCoreApplication.translate("MainWindow", u"placeholder_2", None));
        ___qlistwidgetitem27 = self.identityPhasePage01_List.item(3)
        ___qlistwidgetitem27.setText(QCoreApplication.translate("MainWindow", u"placeholder_3", None));
        ___qlistwidgetitem28 = self.identityPhasePage01_List.item(4)
        ___qlistwidgetitem28.setText(QCoreApplication.translate("MainWindow", u"placeholder_4", None));
        ___qlistwidgetitem29 = self.identityPhasePage01_List.item(5)
        ___qlistwidgetitem29.setText(QCoreApplication.translate("MainWindow", u"placeholder_5", None));
        ___qlistwidgetitem30 = self.identityPhasePage01_List.item(6)
        ___qlistwidgetitem30.setText(QCoreApplication.translate("MainWindow", u"placeholder_6", None));
        ___qlistwidgetitem31 = self.identityPhasePage01_List.item(7)
        ___qlistwidgetitem31.setText(QCoreApplication.translate("MainWindow", u"placeholder_7", None));
        self.identityPhasePage01_List.setSortingEnabled(__sortingEnabled3)


        __sortingEnabled4 = self.identityPhasePage02_List.isSortingEnabled()
        self.identityPhasePage02_List.setSortingEnabled(False)
        ___qlistwidgetitem32 = self.identityPhasePage02_List.item(0)
        ___qlistwidgetitem32.setText(QCoreApplication.translate("MainWindow", u"Identity Pillar", None));
        ___qlistwidgetitem33 = self.identityPhasePage02_List.item(1)
        ___qlistwidgetitem33.setText(QCoreApplication.translate("MainWindow", u"placeholder_1", None));
        ___qlistwidgetitem34 = self.identityPhasePage02_List.item(2)
        ___qlistwidgetitem34.setText(QCoreApplication.translate("MainWindow", u"placeholder_2", None));
        ___qlistwidgetitem35 = self.identityPhasePage02_List.item(3)
        ___qlistwidgetitem35.setText(QCoreApplication.translate("MainWindow", u"placeholder_3", None));
        ___qlistwidgetitem36 = self.identityPhasePage02_List.item(4)
        ___qlistwidgetitem36.setText(QCoreApplication.translate("MainWindow", u"placeholder_4", None));
        ___qlistwidgetitem37 = self.identityPhasePage02_List.item(5)
        ___qlistwidgetitem37.setText(QCoreApplication.translate("MainWindow", u"placeholder_5", None));
        ___qlistwidgetitem38 = self.identityPhasePage02_List.item(6)
        ___qlistwidgetitem38.setText(QCoreApplication.translate("MainWindow", u"placeholder_6", None));
        ___qlistwidgetitem39 = self.identityPhasePage02_List.item(7)
        ___qlistwidgetitem39.setText(QCoreApplication.translate("MainWindow", u"placeholder_7", None));
        self.identityPhasePage02_List.setSortingEnabled(__sortingEnabled4)


        __sortingEnabled5 = self.identityPhasePage03_List.isSortingEnabled()
        self.identityPhasePage03_List.setSortingEnabled(False)
        ___qlistwidgetitem40 = self.identityPhasePage03_List.item(0)
        ___qlistwidgetitem40.setText(QCoreApplication.translate("MainWindow", u"Inception Pillar", None));
        ___qlistwidgetitem41 = self.identityPhasePage03_List.item(1)
        ___qlistwidgetitem41.setText(QCoreApplication.translate("MainWindow", u"placeholder_1", None));
        ___qlistwidgetitem42 = self.identityPhasePage03_List.item(2)
        ___qlistwidgetitem42.setText(QCoreApplication.translate("MainWindow", u"placeholder_2", None));
        ___qlistwidgetitem43 = self.identityPhasePage03_List.item(3)
        ___qlistwidgetitem43.setText(QCoreApplication.translate("MainWindow", u"placeholder_3", None));
        ___qlistwidgetitem44 = self.identityPhasePage03_List.item(4)
        ___qlistwidgetitem44.setText(QCoreApplication.translate("MainWindow", u"placeholder_4", None));
        ___qlistwidgetitem45 = self.identityPhasePage03_List.item(5)
        ___qlistwidgetitem45.setText(QCoreApplication.translate("MainWindow", u"placeholder_5", None));
        ___qlistwidgetitem46 = self.identityPhasePage03_List.item(6)
        ___qlistwidgetitem46.setText(QCoreApplication.translate("MainWindow", u"placeholder_6", None));
        ___qlistwidgetitem47 = self.identityPhasePage03_List.item(7)
        ___qlistwidgetitem47.setText(QCoreApplication.translate("MainWindow", u"placeholder_7", None));
        self.identityPhasePage03_List.setSortingEnabled(__sortingEnabled5)

        self.inception_sensor_15.setText("")
        self.inception_sensor_16.setText("")
        self.inception_sensor_17.setText("")
        self.inception_sensor_18.setText("")
        self.inception_sensor_19.setText("")
        self.inception_sensor_20.setText("")
        self.inception_sensor_21.setText("")
        self.inceptionPhaseGP.setTitle(QCoreApplication.translate("MainWindow", u"Inception Phase", None))

        __sortingEnabled6 = self.inceptionPhasePage01_List.isSortingEnabled()
        self.inceptionPhasePage01_List.setSortingEnabled(False)
        ___qlistwidgetitem48 = self.inceptionPhasePage01_List.item(0)
        ___qlistwidgetitem48.setText(QCoreApplication.translate("MainWindow", u"Input Pillar", None));
        ___qlistwidgetitem49 = self.inceptionPhasePage01_List.item(1)
        ___qlistwidgetitem49.setText(QCoreApplication.translate("MainWindow", u"placeholder_1", None));
        ___qlistwidgetitem50 = self.inceptionPhasePage01_List.item(2)
        ___qlistwidgetitem50.setText(QCoreApplication.translate("MainWindow", u"placeholder_2", None));
        ___qlistwidgetitem51 = self.inceptionPhasePage01_List.item(3)
        ___qlistwidgetitem51.setText(QCoreApplication.translate("MainWindow", u"placeholder_3", None));
        ___qlistwidgetitem52 = self.inceptionPhasePage01_List.item(4)
        ___qlistwidgetitem52.setText(QCoreApplication.translate("MainWindow", u"placeholder_4", None));
        ___qlistwidgetitem53 = self.inceptionPhasePage01_List.item(5)
        ___qlistwidgetitem53.setText(QCoreApplication.translate("MainWindow", u"placeholder_5", None));
        ___qlistwidgetitem54 = self.inceptionPhasePage01_List.item(6)
        ___qlistwidgetitem54.setText(QCoreApplication.translate("MainWindow", u"placeholder_6", None));
        ___qlistwidgetitem55 = self.inceptionPhasePage01_List.item(7)
        ___qlistwidgetitem55.setText(QCoreApplication.translate("MainWindow", u"placeholder_7", None));
        self.inceptionPhasePage01_List.setSortingEnabled(__sortingEnabled6)


        __sortingEnabled7 = self.inceptionPhasePage02_List.isSortingEnabled()
        self.inceptionPhasePage02_List.setSortingEnabled(False)
        ___qlistwidgetitem56 = self.inceptionPhasePage02_List.item(0)
        ___qlistwidgetitem56.setText(QCoreApplication.translate("MainWindow", u"Identity Pillar", None));
        ___qlistwidgetitem57 = self.inceptionPhasePage02_List.item(1)
        ___qlistwidgetitem57.setText(QCoreApplication.translate("MainWindow", u"placeholder_1", None));
        ___qlistwidgetitem58 = self.inceptionPhasePage02_List.item(2)
        ___qlistwidgetitem58.setText(QCoreApplication.translate("MainWindow", u"placeholder_2", None));
        ___qlistwidgetitem59 = self.inceptionPhasePage02_List.item(3)
        ___qlistwidgetitem59.setText(QCoreApplication.translate("MainWindow", u"placeholder_3", None));
        ___qlistwidgetitem60 = self.inceptionPhasePage02_List.item(4)
        ___qlistwidgetitem60.setText(QCoreApplication.translate("MainWindow", u"placeholder_4", None));
        ___qlistwidgetitem61 = self.inceptionPhasePage02_List.item(5)
        ___qlistwidgetitem61.setText(QCoreApplication.translate("MainWindow", u"placeholder_5", None));
        ___qlistwidgetitem62 = self.inceptionPhasePage02_List.item(6)
        ___qlistwidgetitem62.setText(QCoreApplication.translate("MainWindow", u"placeholder_6", None));
        ___qlistwidgetitem63 = self.inceptionPhasePage02_List.item(7)
        ___qlistwidgetitem63.setText(QCoreApplication.translate("MainWindow", u"placeholder_7", None));
        self.inceptionPhasePage02_List.setSortingEnabled(__sortingEnabled7)


        __sortingEnabled8 = self.inceptionPhasePage03_List.isSortingEnabled()
        self.inceptionPhasePage03_List.setSortingEnabled(False)
        ___qlistwidgetitem64 = self.inceptionPhasePage03_List.item(0)
        ___qlistwidgetitem64.setText(QCoreApplication.translate("MainWindow", u"Inception Pillar", None));
        ___qlistwidgetitem65 = self.inceptionPhasePage03_List.item(1)
        ___qlistwidgetitem65.setText(QCoreApplication.translate("MainWindow", u"placeholder_1", None));
        ___qlistwidgetitem66 = self.inceptionPhasePage03_List.item(2)
        ___qlistwidgetitem66.setText(QCoreApplication.translate("MainWindow", u"placeholder_2", None));
        ___qlistwidgetitem67 = self.inceptionPhasePage03_List.item(3)
        ___qlistwidgetitem67.setText(QCoreApplication.translate("MainWindow", u"placeholder_3", None));
        ___qlistwidgetitem68 = self.inceptionPhasePage03_List.item(4)
        ___qlistwidgetitem68.setText(QCoreApplication.translate("MainWindow", u"placeholder_4", None));
        ___qlistwidgetitem69 = self.inceptionPhasePage03_List.item(5)
        ___qlistwidgetitem69.setText(QCoreApplication.translate("MainWindow", u"placeholder_5", None));
        ___qlistwidgetitem70 = self.inceptionPhasePage03_List.item(6)
        ___qlistwidgetitem70.setText(QCoreApplication.translate("MainWindow", u"placeholder_6", None));
        ___qlistwidgetitem71 = self.inceptionPhasePage03_List.item(7)
        ___qlistwidgetitem71.setText(QCoreApplication.translate("MainWindow", u"placeholder_7", None));
        self.inceptionPhasePage03_List.setSortingEnabled(__sortingEnabled8)

        self.inception_sensor_22.setText("")
        self.inception_sensor_23.setText("")
        self.inception_sensor_24.setText("")
        self.inception_sensor_25.setText("")
        self.inception_sensor_26.setText("")
        self.inception_sensor_27.setText("")
        self.inception_sensor_28.setText("")
        self.label.setText(QCoreApplication.translate("MainWindow", u"Mini Prompts", None))
        self.outputRank1Label.setText(QCoreApplication.translate("MainWindow", u"Rank 1", None))
        self.outputRank2Label.setText(QCoreApplication.translate("MainWindow", u"Rank 2", None))
        self.outputRank3Label.setText(QCoreApplication.translate("MainWindow", u"Rank 3", None))
        self.outputRank4Label.setText(QCoreApplication.translate("MainWindow", u"Rank 4", None))
        self.outputRank5Label.setText(QCoreApplication.translate("MainWindow", u"Rank 5", None))
        self.outputRank6Label.setText(QCoreApplication.translate("MainWindow", u"Rank 6", None))
        self.outputRank7Label.setText(QCoreApplication.translate("MainWindow", u"Rank 7", None))
        self.groupBox_4.setTitle(QCoreApplication.translate("MainWindow", u"Modifiers", None))
        self.inputPhaseGB_2.setTitle(QCoreApplication.translate("MainWindow", u"Input Phase", None))
        self.auditInputPhaseLabel_2.setText(QCoreApplication.translate("MainWindow", u"Input Pillar", None))
        self.auditIdentityPhaseLabel_2.setText(QCoreApplication.translate("MainWindow", u"Identity Pillar", None))
        self.auditInceptionPhaseLabel_2.setText(QCoreApplication.translate("MainWindow", u"Inception Pillar", None))
        self.identityPhaseGB_2.setTitle(QCoreApplication.translate("MainWindow", u"Identity Phase", None))
        self.auditInputPhaseLabel_3.setText(QCoreApplication.translate("MainWindow", u"Input Pillar", None))
        self.auditIdentityPhaseLabel_3.setText(QCoreApplication.translate("MainWindow", u"Identity Pillar", None))
        self.auditInceptionPhaseLabel_3.setText(QCoreApplication.translate("MainWindow", u"Inception Pillar", None))
        self.inceptionPhaseGB.setTitle(QCoreApplication.translate("MainWindow", u"Inception Phase", None))
        self.auditInputPhaseLabel_4.setText(QCoreApplication.translate("MainWindow", u"Input Pillar", None))
        self.auditIdentityPhaseLabel_4.setText(QCoreApplication.translate("MainWindow", u"Identity Pillar", None))
        self.auditInceptionPhaseLabel_4.setText(QCoreApplication.translate("MainWindow", u"Inception Pillar", None))
        self.arcsGB.setTitle(QCoreApplication.translate("MainWindow", u"Arcs", None))
        self.finalOutputGB.setTitle(QCoreApplication.translate("MainWindow", u"Final Output", None))
        self.decompGB.setTitle(QCoreApplication.translate("MainWindow", u"Decomposition", None))
        self.arcLabel_1.setText(QCoreApplication.translate("MainWindow", u"1", None))
        self.arcLabel_3.setText(QCoreApplication.translate("MainWindow", u"2", None))
        self.arcLabel_2.setText(QCoreApplication.translate("MainWindow", u"3", None))
        self.arcLabel_4.setText(QCoreApplication.translate("MainWindow", u"4", None))
        self.arcLabel_5.setText(QCoreApplication.translate("MainWindow", u"5", None))
        self.arcLabel_6.setText(QCoreApplication.translate("MainWindow", u"6", None))
        self.arcLabel_7.setText(QCoreApplication.translate("MainWindow", u"7", None))
        self.structPromptGB.setTitle(QCoreApplication.translate("MainWindow", u"Structured Prompt", None))
        self.triSumLabel_1.setText(QCoreApplication.translate("MainWindow", u"1", None))
        self.triSumLabel_2.setText(QCoreApplication.translate("MainWindow", u"2", None))
        self.triSumLabel_3.setText(QCoreApplication.translate("MainWindow", u"3", None))
        self.triSumLabel_4.setText(QCoreApplication.translate("MainWindow", u"4", None))
        self.triSumLabel_5.setText(QCoreApplication.translate("MainWindow", u"5", None))
        self.triSumLabel_6.setText(QCoreApplication.translate("MainWindow", u"6", None))
        self.triSumLabel_7.setText(QCoreApplication.translate("MainWindow", u"7", None))
        self.triadsGB.setTitle(QCoreApplication.translate("MainWindow", u"Triads", None))
        self.triadGB_1.setTitle(QCoreApplication.translate("MainWindow", u"1rst Triadic Pairing", None))
        self.triSumLabel_8.setText(QCoreApplication.translate("MainWindow", u"1", None))
        self.triSumLabel_9.setText(QCoreApplication.translate("MainWindow", u"2", None))
        self.triSumLabel_10.setText(QCoreApplication.translate("MainWindow", u"3", None))
        self.triSumLabel_11.setText(QCoreApplication.translate("MainWindow", u"4", None))
        self.triSumLabel_12.setText(QCoreApplication.translate("MainWindow", u"5", None))
        self.triSumLabel_13.setText(QCoreApplication.translate("MainWindow", u"6", None))
        self.triSumLabel_14.setText(QCoreApplication.translate("MainWindow", u"7", None))
        self.triadGB_2.setTitle(QCoreApplication.translate("MainWindow", u"2nd Triadic Pairing", None))
        self.triSumLabel_15.setText(QCoreApplication.translate("MainWindow", u"1", None))
        self.triSumLabel_16.setText(QCoreApplication.translate("MainWindow", u"2", None))
        self.triSumLabel_17.setText(QCoreApplication.translate("MainWindow", u"3", None))
        self.triSumLabel_18.setText(QCoreApplication.translate("MainWindow", u"4", None))
        self.triSumLabel_19.setText(QCoreApplication.translate("MainWindow", u"5", None))
        self.triSumLabel_20.setText(QCoreApplication.translate("MainWindow", u"6", None))
        self.triSumLabel_21.setText(QCoreApplication.translate("MainWindow", u"7", None))
        self.triadGB_3.setTitle(QCoreApplication.translate("MainWindow", u"3rd Triadic Pairing", None))
        self.triSumLabel_22.setText(QCoreApplication.translate("MainWindow", u"1", None))
        self.triSumLabel_23.setText(QCoreApplication.translate("MainWindow", u"2", None))
        self.triSumLabel_24.setText(QCoreApplication.translate("MainWindow", u"3", None))
        self.triSumLabel_25.setText(QCoreApplication.translate("MainWindow", u"4", None))
        self.triSumLabel_26.setText(QCoreApplication.translate("MainWindow", u"5", None))
        self.triSumLabel_27.setText(QCoreApplication.translate("MainWindow", u"6", None))
        self.triSumLabel_28.setText(QCoreApplication.translate("MainWindow", u"7", None))
        self.datasetGB.setTitle(QCoreApplication.translate("MainWindow", u"Dataset", None))
        self.attributionB.setTitle(QCoreApplication.translate("MainWindow", u"Attribution", None))
        self.auditTemplateNameLabel.setText(QCoreApplication.translate("MainWindow", u"Template Name", None))
        self.auditDateLabel.setText(QCoreApplication.translate("MainWindow", u"Date", None))
        self.auditDeptLabel.setText(QCoreApplication.translate("MainWindow", u"Department", None))
        self.auditClassificationLabel.setText(QCoreApplication.translate("MainWindow", u"Classification", None))
        self.auditAuthorLabel.setText(QCoreApplication.translate("MainWindow", u"Author", None))
        self.notesGB.setTitle(QCoreApplication.translate("MainWindow", u"Notes", None))
        self.auditTransformsGB.setTitle(QCoreApplication.translate("MainWindow", u"Transforms", None))
        self.auditInputPhaseLabel.setText(QCoreApplication.translate("MainWindow", u"Input Phase", None))
        self.auditIdentityPhaseLabel.setText(QCoreApplication.translate("MainWindow", u"Identity Phase", None))
        self.auditInceptionPhaseLabel.setText(QCoreApplication.translate("MainWindow", u"Inception Phase", None))
        self.agentsGB.setTitle(QCoreApplication.translate("MainWindow", u"Agents", None))
        self.decomposerGB.setTitle(QCoreApplication.translate("MainWindow", u"Decomposer", None))
        self.decomSysPromptLabel.setText(QCoreApplication.translate("MainWindow", u"SYSTEM PROMPT", None))
        self.curatorGB.setTitle(QCoreApplication.translate("MainWindow", u"Curator", None))
        self.curSysPromptLabel_2.setText(QCoreApplication.translate("MainWindow", u"SYSTEM PROMPT", None))
        self.composerGB.setTitle(QCoreApplication.translate("MainWindow", u"Composer", None))
        self.comSysPromptLabel_3.setText(QCoreApplication.translate("MainWindow", u"SYSTEM PROMPT", None))
        self.telGB.setTitle(QCoreApplication.translate("MainWindow", u"Telemetry", None))
        self.checkGB_1.setTitle(QCoreApplication.translate("MainWindow", u"Checkpoint 1", None))
        self.telCheckLabel_1.setText(QCoreApplication.translate("MainWindow", u"1", None))
        self.telCheckLabel_2.setText(QCoreApplication.translate("MainWindow", u"2", None))
        self.telCheckLabel_3.setText(QCoreApplication.translate("MainWindow", u"3", None))
        self.telCheckLabel_4.setText(QCoreApplication.translate("MainWindow", u"4", None))
        self.telCheckLabel_5.setText(QCoreApplication.translate("MainWindow", u"5", None))
        self.telCheckLabel_6.setText(QCoreApplication.translate("MainWindow", u"6", None))
        self.telCheckLabel_7.setText(QCoreApplication.translate("MainWindow", u"7", None))
        self.checkGB_2.setTitle(QCoreApplication.translate("MainWindow", u"Checkpoint 2", None))
        self.telCheckLabel_8.setText(QCoreApplication.translate("MainWindow", u"1", None))
        self.telCheckLabel_9.setText(QCoreApplication.translate("MainWindow", u"2", None))
        self.telCheckLabel_10.setText(QCoreApplication.translate("MainWindow", u"3", None))
        self.telCheckLabel_11.setText(QCoreApplication.translate("MainWindow", u"4", None))
        self.telCheckLabel_12.setText(QCoreApplication.translate("MainWindow", u"5", None))
        self.telCheckLabel_13.setText(QCoreApplication.translate("MainWindow", u"6", None))
        self.telCheckLabel_14.setText(QCoreApplication.translate("MainWindow", u"7", None))
        self.checkGB_3.setTitle(QCoreApplication.translate("MainWindow", u"Checkpoint 3", None))
        self.telCheckLabel_15.setText(QCoreApplication.translate("MainWindow", u"1", None))
        self.telCheckLabel_16.setText(QCoreApplication.translate("MainWindow", u"2", None))
        self.telCheckLabel_17.setText(QCoreApplication.translate("MainWindow", u"3", None))
        self.telCheckLabel_18.setText(QCoreApplication.translate("MainWindow", u"4", None))
        self.telCheckLabel_19.setText(QCoreApplication.translate("MainWindow", u"5", None))
        self.telCheckLabel_20.setText(QCoreApplication.translate("MainWindow", u"6", None))
        self.telCheckLabel_21.setText(QCoreApplication.translate("MainWindow", u"7", None))
    # retranslateUi

