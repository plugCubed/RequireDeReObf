function createEvent(string, name) {
    return {
        nameLength: 3,
        modules: ['app/events/Event'],
        strings: [string],
        name: {
            2: name
        }
    };
}

function createDialog(id, name) {
    return {
        nameLength: 4,
        variables: {
            id: id
        },
        nameStart: 'app/views/dialogs/',
        name: {
            3: name
        }
    };
}

function createService(type, endpoint, category, name, nameStart) {
    var strings = [type];
    if (typeof endpoint === 'string') strings.push(endpoint);
    else for (var i in endpoint) {
        if (endpoint.hasOwnProperty(i))
            strings.push(endpoint[i]);
    }
    return {
        nameLength: 4,
        modules: ['app/net/RPCGateway', 'app/services/Service'],
        strings: strings,
        nameStart: nameStart ? nameStart : 'app/services/',
        name: {
            2: category,
            3: name
        }
    }
}

module.exports = [{
    nameLength: 3,
    moduleLength: 0,
    variables: ['this._super'],
    name: {
        0: 'app',
        1: 'base',
        2: 'Class'
    }
}, {
    nameLength: 3,
    functions: ['addItem', 'contains', 'getItem', 'removeItem', 'removeAll'],
    name: {
        1: 'utils',
        2: 'Dictionary'
    }
}, {
    nameLength: 3,
    nameStart: 'app/utils',
    functions: ['cleanTypedString'],
    name: {
        2: 'Utilities'
    }
}, {
    nameLength: 3,
    modules: ['underscore', 'backbone'],
    functions: ['dispatch'],
    nameStart: 'app/base/',
    name: {
        2: 'Context'
    }
}, {
    nameLength: 3,
    moduleLength: 4,
    modules: ['underscore', 'app/base/Class', 'app/base/Context'],
    functions: ['init', 'mapEvent', 'unmapEvent', 'execute'],
    name: {
        2: 'CommandMap'
    }
}, {
    nameLength: 3,
    moduleLength: 2,
    modules: ['app/base/Class', 'app/base/Context'],
    functions: ['init', 'dispatch', 'trigger', 'execute'],
    name: {
        2: 'Command'
    }
}, {
    nameLength: 3,
    strings: ['AlertEvent:alert'],
    nameStart: 'app/',
    name: {
        1: 'events',
        2: 'AlertEvent'
    }
}, {
    nameLength: 3,
    modules: ['app/base/Class'],
    children: ['app/events/AlertEvent'],
    name: {
        1: 'events',
        2: 'Event'
    }
},
    createEvent('ChatFacadeEvent:clear', 'ChatFacadeEvent'),
    createEvent('CustomRoomEvent:custom', 'CustomRoomEvent'),
    createEvent('DJEvent:join', 'DJEvent'),
    createEvent('FacebookLoginEvent:login', 'FacebookLoginEvent'),
    createEvent('HistorySyncEvent:room', 'HistorySyncEvent'),
    createEvent('ImportYouTubeEvent:import', 'ImportYouTubeEvent'),
    createEvent('ImportSoundCloudEvent:tracks', 'ImportSoundCloudEvent'),
    createEvent('MediaActionEvent:playnext', 'MediaActionEvent'),
    createEvent('MediaDeleteEvent:delete', 'MediaDeleteEvent'),
    createEvent('MediaGrabEvent:grab', 'MediaGrabEvent'),
    createEvent('MediaInsertEvent:insert', 'MediaInsertEvent'),
    createEvent('MediaMoveEvent:shuffle', 'MediaMoveEvent'),
    createEvent('MediaUpdateEvent:update', 'MediaUpdateEvent'),
    createEvent('ModerateEvent:skip', 'ModerateEvent'),
    createEvent('PlayMediaEvent:play', 'PlayMediaEvent'),
    createEvent('PlaylistActionEvent:delete', 'PlaylistActionEvent'),
    createEvent('PlaylistCreateEvent:create', 'PlaylistCreateEvent'),
    createEvent('PlaylistDeleteEvent:delete', 'PlaylistDeleteEvent'),
    createEvent('PlaylistRenameEvent:rename', 'PlaylistRenameEvent'),
    createEvent('PreviewEvent:preview', 'PreviewEvent'),
    createEvent('RelatedBackEvent:back', 'RelatedBackEvent'),
    createEvent('RestrictedSearchEvent:search', 'RestrictedSearchEvent'),
    createEvent('RoomEvent:join', 'RoomEvent'),
    createEvent('RoomCreateEvent:create', 'RoomCreateEvent'),
    createEvent('ShowDialogEvent:show', 'ShowDialogEvent'),
    createEvent('ShowUserRolloverEvent:show', 'ShowUserRolloverEvent'),
    createEvent('StoreEvent:purchaseAvatar', 'StoreEvent'),
    createEvent('UserEvent:me', 'UserEvent'),
    createEvent('UserListEvent:staff', 'UserListEvent'),
    {
    nameLength: 3,
    moduleLength: 3,
    modules: ['jquery', 'underscore', 'backbone'],
    nameStart: 'app/utils/',
    name: {
        2: 'Layout'
    }
}, {
    nameLength: 3,
    functions: ['priority', 'username', 'role', 'lookup', 'timestamp'],
    nameStart: 'app/utils/',
    name: {
        2: 'Sorts'
    }
}, {
    nameLength: 3,
    modules: ['backbone', 'app/utils/Sorts'],
    functions: ['prioritize', 'onRole', 'getAudience'],
    name: {
        1: 'collections',
        2: 'UserCollection'
    }
}, {
    nameLength: 3,
    functions: ['jumpToMedia','getActiveID'],
    nameStart: 'app/collections/',
    name: {
        2: 'PlaylistCollection'
    }
}, {
    nameLength: 3,
    modules: ['underscore', 'backbone'],
    variables: ['slug', 'hostID'],
    name: {
        1: 'models',
        2: 'RoomModel'
    }
}, {
    nameLength: 3,
    modules: ['underscore', 'backbone', 'app/models/RoomModel', 'lang/Lang'],
    functions: ['hasPermission', 'checkStaffAvatar'],
    name: {
        2: 'UserModel'
    }
}, {
    nameLength: 3,
    moduleLength: 1,
    modules: ['app/models/UserModel'],
    functions: ['canModChat', 'canModMute'],
    nameStart: 'app/models/',
    name: {
        2: 'TheUserModel'
    }
}, {
    nameLength: 3,
    modules: ['app/base/Class', 'app/models/TheUserModel'],
    functions: ['add', 'remove', 'lookup'],
    name: {
        2: 'UsernameLookup'
    }
}, {
    nameLength: 3,
    moduleLength: 1,
    modules: ['app/base/Class'],
    functions: ['monthsSince'],
    nameStart: 'app/utils/',
    name: {
        2: 'DateUtilities'
    }
}, {
    nameLength: 3,
    functions: ['newSeed'],
    nameStart: 'app/utils/',
    name: {
        2: 'Random'
    }
}, {
    nameLength: 4,
    modules: [
        'hbs!templates/dialogs/DialogCancel',
        'hbs!templates/dialogs/DialogCheckBox',
        'hbs!templates/dialogs/DialogHeader',
        'hbs!templates/dialogs/DialogInputContainer',
        'hbs!templates/dialogs/DialogMenu',
        'hbs!templates/dialogs/DialogMenuOption',
        'hbs!templates/dialogs/DialogSubmit',
        'hbs!templates/dialogs/DialogTextArea'
    ],
    name: {
        1: 'views',
        2: 'dialogs',
        3: 'AbstractDialogView'
    }
}, {
    nameLength: 4,
    variables: {
        id: 'dialog-alert'
    },
    name: {
        3: 'DialogAlert'
    }
}, {
    nameLength: 4,
    moduleLength: 3,
    variables: {
        id: 'dialog-confirm'
    },
    name: {
        3: 'DialogConfirm'
    }
}, {
    nameLength: 3,
    modules: ['app/base/Command', 'app/events/AlertEvent', 'app/events/ShowDialogEvent', 'app/views/dialogs/DialogAlert', 'app/views/dialogs/DialogConfirm'],
    name: {
        1: 'commands',
        2: 'AlertCommand'
    }
}, {
    nameLength: 3,
    moduleLength: 3,
    modules: ['underscore', 'app/base/Command', 'app/utils/Dictionary'],
    functions: ['init', 'listenTo', 'finish'],
    name: {
        2: 'AsyncCommand'
    }
}, {
    nameLength: 3,
    variables: ['w', 'h', 'sw'],
    name: {
        2: 'AvatarCollection'
    }
}, {
    nameLength: 3,
    functions: [['success', 3], ['error', 1]],
    strings: ['/_/'],
    name: {
        1: 'net',
        2: 'RPCGateway'
    }
}, {
    nameLength: 3,
    functions: ['add', 'append', 'next', 'complete'],
    name: {
        1: 'services',
        2: 'ServiceQueue'
    }
}, {
    nameLength: 3,
    modules: ['app/services/ServiceQueue'],
    functions: ['onSuccess', 'onError', 'onFault'],
    name: {
        2: 'Service'
    }
},
    createService('GET','news','dashboard', 'GetNewsService'),

    createService('GET','bans','bans', 'GetBansService'),
    createService('POST','bans/add','bans', 'AddBanService'),
    createService('DELETE','bans/','bans', 'RemoveBanService'),

    createService('POST','booth','booth', 'JoinBoothService'),
    createService('DELETE','booth','booth', 'LeaveBoothService'),
    createService('POST','booth/skip/me','booth', 'RemoveSelfService'),
    createService('POST','booth/add','booth', 'AddDJService'),
    createService('DELETE','booth/remove/','booth', 'RemoveDJService'),
    createService('POST','booth/skip','booth', 'SkipDJService'),
    createService('PUT','booth/lock','booth', 'BoothLockService'),
    createService('POST','booth/move','booth', 'MoveDJService'),
    createService('PUT','booth/cycle','booth', 'CycleBoothService'),

    createService('POST','auth/facebook','auth', 'AuthFacebookService'),
    createService('GET','auth/token','auth', 'GetTokenService'),
    createService('DELETE','auth/session','auth', 'DeleteSessionService'),
    createService('POST','auth/reset/me','auth', 'ResetSelfService'),

    createService('GET','users/me','users', 'GetSelfService'),
    createService('GET','users/','users', 'GetUserService'),
    createService('POST','users/bulk','users', 'GetUsersService'),
    createService('PUT','users/avatar','users', 'ChangeAvatarService'),
    createService('GET','users/me/history','users', 'GetHistoryService'),
    createService('PUT','users/status','users', 'ChangeStatusService'),
    createService('PUT','users/language','users', 'ChangeLanguageService'),
    createService('PUT','users/badge','users', 'ChangeBadgeService'),
    createService('GET','users/validate/','users', 'ValidateUsernameService'),
    createService('GET','users/me/transactions','users', 'GetTransactionsService'),

    createService('GET','rooms/history','community', 'GetRoomHistoryService'),
    createService('DELETE','chat/','community', 'DeleteChatService'),
    createService('POST','rooms','community', 'CreateRoomService'),
    createService('POST','rooms/join','community', 'RoomJoinService'),
    createService('GET','rooms/state','community', 'RoomStateService'),
    createService('POST','votes','community', 'VoteService'),
    createService('GET','rooms/favorites','community', 'GetRoomFavoritesService'),
    createService('GET','rooms','community', 'GetRoomsService'),
    createService('POST','rooms/favorites','community', 'AddRoomFavoriteService'),
    createService('DELETE','rooms/favorites/','community', 'RemoveRoomFavoriteService'),
    createService('POST','rooms/update','community', 'UpdateRoomService'),
    createService('GET','rooms/me','community', 'GetOwnRoomsService'),
    createService('GET','rooms/validate/','community', 'ValidateRoomNameService'),

    createService('GET','ignores','ignores', 'GetIgnoresService'),
    createService('POST','ignores','ignores', 'AddIgnoreService'),
    createService('DELETE','ignores/','ignores', 'RemoveIgnoreService', 'app/services/ignores/'),

    createService('POST','/media/delete','playlist', 'RemoveMediasService'),
    createService('POST','grabs','playlist', 'GrabService'),
    createService('POST','/media/insert','playlist', 'AddMediaService'),
    createService('PUT','/media/move','playlist', 'MoveMediaService'),
    createService('PUT','/media/update','playlist', 'UpdateMediaService'),
    createService('GET','/media','playlist', 'GetMediasService'),
    createService('GET','playlists/media?q=','playlist', 'SearchMediaService'),
    createService('GET','playlists','playlist', 'PlaylistSelectService'),
    createService('PUT','/activate','playlist', 'PlaylistActivateService'),
    createService('POST','playlists','playlist', 'PlaylistCreateService'),
    createService('DELETE','playlists/','playlist', 'PlaylistDeleteService'),
    createService('PUT', ['playlists/', '/rename'], 'playlist', 'PlaylistRenameService'),
    createService('PUT', ['playlists/', '/shuffle'], 'playlist', 'PlaylistShuffleService'),

    createService('PUT','profile/blurb','profile', 'UpdateProfileBlurbService'),

    createService('DELETE','notifications/','notifications', 'RemoveNotificationService'),

    createService('GET','friends','friends', 'GetFriendsService'),
    createService('POST','friends','friends', 'AddFriendService'),
    createService('DELETE','friends/','friends', 'RemoveFriendService'),
    createService('PUT','friends/ignore','friends', 'IgnoreFriendService'),
    createService('GET','friends/invites','friends', 'GetFriendInvitesService'),

    createService('POST','mutes','mutes', 'MuteUserService'),
    createService('GET','mutes','mutes', 'GetMutesService'),
    createService('DELETE','mutes/','mutes', 'UnmuteUserService'),

    createService('GET','staff','staff', 'GetStaffService'),
    createService('DELETE','staff/','staff', 'RemoveStaffService'),
    createService('POST','staff/update','staff', 'UpdateStaffService'),

    createService('GET','store/inventory','store', 'GetInventoryService'),
    createService('POST','store/purchase','store', 'PurchaseService'),
    createService('POST','store/purchase/username','store', 'PurchaseUsernameService'),
    createService('GET','store/products/','store', 'GetProductsService'),
{
    nameLength: 3,
    children: ['app/services/ignores/AddIgnoreService','app/services/ignores/RemoveIgnoreService'],
    nameStart: 'app/collections/',
    name: {
        2: 'IgnoreCollection'
    }
}, {
    nameLength: 3,
    functions: ['event', 'community', 'identify'],
    nameStart: 'app/utils/',
    name: {
        2: 'Track'
    }
}, {
    nameLength: 3,
    modules: ['app/services/store/GetProductsService'],
    strings: ['avatars'],
    nameStart: 'app/commands/',
    name: {
        2: 'GetAvatarsCommand'
    }
}, {
    nameLength: 3,
    modules: ['app/services/store/GetProductsService'],
    strings: ['badges'],
    nameStart: 'app/commands/',
    name: {
        2: 'GetBadgesCommand'
    }
}, {
    nameLength: 3,
    modules: ['app/services/users/ChangeAvatarService'],
    nameStart: 'app/commands/',
    name: {
        2: 'AvatarChangeCommand'
    }
}, {
    nameLength: 3,
    modules: ['app/base/Command'],
    strings: ['custom:load'],
    name: {
        2: 'CustomRoomCommand'
    }
}, {
    nameLength: 3,
    variables: ['chatSound', 'avatarcap', 'streamDisabled', 'chatTimestamps'],
    name: {
        1: 'store',
        2: 'Database'
    }
}, {
    nameLength: 3,
    functions: ['onStartTimeChange'],
    nameStart: 'app/models/',
    name: {
        2: 'PlaybackModel'
    }
}, {
    nameLength: 3,
    variables: ['full_moon'],
    nameStart: 'app/utils/',
    name: {
        2: 'Emoji'
    }
}, {
    nameLength: 3,
    stringsContains: ['/_/static/images/soundcloud_thumbnail.'],
    nameStart: 'app/utils/',
    name: {
        2: 'UI'
    }
}, {
    nameLength: 3,
    functions: ['toggleEmoji'],
    name: {
        1: 'facades',
        2: 'ChatFacade'
    }
}, {
    nameLength: 3,
    functions: ['getUserPosition'],
    strings: ['userPlaying:update'],
    name: {
        2: 'DJWaitListCollection'
    }
}, {
    nameLength: 3,
    variables: ['id','cid','title','image', 'format', 'duration'],
    nameStart: 'app/models/',
    name: {
        2: 'MediaModel'
    }
}, {
    nameLength: 4,
    functions: ['moderateAddDJ', 'moderateSetRole'],
    nameStart: 'app/utils/',
    name: {
        2: 'api',
        3: 'ModerationAPI'
    }
}, {
    nameLength: 3,
    strings: ['chat:command'],
    children: ['app/utils/api/ModerationAPI'],
    nameStart: 'app/utils/',
    name: {
        2: 'API'
    }
}, {
    nameLength: 3,
    modules: ['app/services/community/GetRoomHistoryService'],
    nameStart: 'app/commands/',
    name: {
        2: 'HistorySyncCommand'
    }
}, {
    nameLength: 3,
    functions: ['invalidateRoomElements'],
    name: {
        2: 'GridData'
    }
}, {
    nameLength: 3,
    variables: ['window.AvatarManifest'],
    nameStart: 'app/utils/',
    name: {
        2: 'AvatarManifest'
    }
}, createDialog('dialog-ban-user', 'DialogBanUser'), createDialog('dialog-skip', 'DialogSkip'), createDialog('dialog-user-role', 'DialogUserRole'), createDialog('dialog-media-update', 'DialogMediaUpdate'), {
    nameLength: 4,
    modules: ['app/events/MediaDeleteEvent'],
    variables: {
        id: 'dialog-delete'
    },
    nameStart: 'app/views/dialogs/',
    name: {
        3: 'DialogMediaDelete'
    }
}, createDialog('dialog-playlist-create', 'DialogPlaylistCreate'), createDialog('dialog-playlist-rename', 'DialogPlaylistRename'), createDialog('dialog-playlist-delete', 'DialogPlaylistDelete'), {
    nameLength: 5,
    variables: {
        className: 'media-list'
    },
    nameStart: 'app/views/',
    name: {
        2: 'playlist',
        3: 'help',
        4: 'PlaylistHelpView'
    }
}, {
    nameLength: 5,
    modules: ['hbs!templates/room/user/BanListRow'],
    nameStart: 'app/',
    name: {
        1: 'views',
        2: 'room',
        3: 'user',
        4: 'BannedUserListRow'
    }
}, {
    nameLength: 5,
    variables: {
        className: 'list staff'
    },
    name: {
        4: 'RoomStaffListView'
    }
}, {
    nameLength: 4,
    variables: {
        id: 'audience'
    },
    name: {
        3: 'AudienceView'
    }
}, {
    nameLength: 5,
    modules: ['hbs!templates/room/chat/Chat'],
    nameStart: 'app/views/room/',
    name: {
        3: 'chat',
        4: 'Chat'
    }
}, {
    nameLength: 5,
    variables: {
        id: 'user-lists'
    },
    name: {
        4: 'UserListsView'
    }
}, {
    nameLength: 5,
    modules: ['app/events/ShowUserRolloverEvent'],
    variables: {
        className: 'user'
    },
    strings: ['#user-lists'],
    nameStart: 'app/views/room/user/',
    name: {
        4: 'RoomStaffListRow'
    }
}, {
    nameLength: 4,
    variables: {
        className: 'spinner'
    },
    nameStart: 'app/views/',
    name: {
        2: 'spinner',
        3: 'Spinner'
    }
}, {
    nameLength: 3,
    variables: ['window._gws'],
    name: {
        2: 'Socket'
    }
}, {
    nameLength: 4,
    functions: ['plugMaintenance'],
    nameStart: 'app/net/',
    name: {
        2: 'messages',
        3: 'PlugMaintenanceMessage'
    }
}, {
    nameLength: 4,
    functions: ['playlistCycle'],
    nameStart: 'app/net/messages/',
    name: {
        3: 'PlaylistCycleMessage'
    }
}, {
    nameLength: 4,
    functions: ['plugMessage'],
    nameStart: 'app/net/messages/',
    name: {
        3: 'plugMessage'
    }
}, {
    nameLength: 4,
    functions: ['plugUpdate'],
    nameStart: 'app/net/messages/',
    name: {
        3: 'plugUpdateMessage'
    }
}, {
    nameLength: 3,
    children: ['app/net/messages/PlugMaintenanceMessage'],
    nameStart: 'app/net/',
    name: {
        2: 'SocketListener'
    }
}, {
    nameLength: 3,
    modules: ['app/services/booth/JoinBoothService', 'app/services/booth/LeaveBoothService', 'app/services/booth/RemoveSelfService'],
    nameStart: 'app/commands/',
    name: {
        2: 'DJCommand'
    }
}, {
    nameLength: 4,
    strings: ['&start-index='],
    nameStart: 'app/services/',
    name: {
        2: 'youtube',
        3: 'YouTubeSearchService'
    }
}, {
    nameLength: 4,
    strings: ['https://gdata.youtube.com/feeds/api/users/', '/playlists?v=2&alt=json&start-index='],
    nameStart: 'app/services/youtube/',
    name: {
        3: 'YouTubePlaylistService'
    }
}, {
    nameLength: 4,
    strings: ['https://gdata.youtube.com/feeds/api/users/', '/favorites'],
    nameStart: 'app/services/youtube/',
    name: {
        3: 'YouTubeImportService'
    }
}, {
    nameLength: 3,
    strings: ['//connect.soundcloud.com/sdk.js'],
    nameStart: 'app/utils/',
    name: {
        2: 'SC'
    }
}, {
    nameLength: 4,
    strings: ['SoundCloud Search Error'],
    nameStart: 'app/services/',
    name: {
        2: 'soundcloud',
        3: 'SoundCloudSearchService'
    }
}, {
    nameLength: 4,
    strings: ['SoundCloud Favorites Error'],
    nameStart: 'app/services/soundcloud/',
    name: {
        3: 'SoundCloudFavoritesService'
    }
}, {
    nameLength: 4,
    strings: ['SoundCloud Permalink Error'],
    nameStart: 'app/services/soundcloud/',
    name: {
        3: 'SoundCloudPermalinkService'
    }
}, {
    nameLength: 4,
    strings: ['SoundCloud Tracks Error'],
    nameStart: 'app/services/soundcloud/',
    name: {
        3: 'SoundCloudTracksService'
    }
}, {
    nameLength: 4,
    strings: ['SoundCloud Sets Error'],
    nameStart: 'app/services/soundcloud/',
    name: {
        3: 'SoundCloudSetsService'
    }
}, {
    nameLength: 3,
    modules: [
        'app/services/youtube/YouTubeSearchService',
        'app/services/youtube/YouTubePlaylistService',
        'app/services/youtube/YouTubeImportService',
        'app/services/soundcloud/SoundCloudSearchService',
        'app/services/soundcloud/SoundCloudFavoritesService',
        'app/services/soundcloud/SoundCloudPermalinkService',
        'app/services/soundcloud/SoundCloudTracksService',
        'app/services/soundcloud/SoundCloudSetsService'
    ],
    nameStart: 'app/facades/',
    name: {
        2: 'SearchServiceFacade'
    }
}, {
    nameLength: 3,
    strings: ['YouTube Favorites'],
    notStrings: ['import:ytplaylists'],
    nameStart: 'app/facades/',
    name: {
        2: 'ImportYouTubePlaylistMediaFacade'
    }
}, {
    nameLength: 3,
    strings: ['YouTube Favorites', 'import:ytplaylists'],
    nameStart: 'app/facades/',
    name: {
        2: 'ImportYouTubePlaylistFacade'
    }
}, {
    nameLength: 3,
    functions: ['execute', 'onMediaLoaded'],
    modules: ['app/base/AsyncCommand', 'app/facades/ImportYouTubePlaylistMediaFacade'],
    nameStart: 'app/commands/',
    name: {
        2: 'ImportYouTubeCommand'
    }
}, {
    nameLength: 3,
    variables: ['media', 'playlist'],
    children: ['app/events/MediaActionEvent'],
    nameStart: 'app/models/',
    name: {
        2: 'SearchLocalModel'
    }
}, {
    nameLength: 3,
    modules: ['app/services/community/CreateRoomService'],
    nameStart: 'app/commands/',
    name: {
        2: 'RoomCreateCommand'
    }
}, {
    nameLength: 3,
    modules: ['app/services/community/RoomJoinService'],
    nameStart: 'app/commands/',
    name: {
        2: 'RoomJoinCommand'
    }
}, {
    nameLength: 3,
    modules: ['app/services/community/RoomStateService'],
    nameStart: 'app/commands/',
    name: {
        2: 'RoomStateCommand'
    }
}, {
    nameLength: 3,
    modules: [
        'app/services/bans/AddBanService',
        'app/services/bans/RemoveBanService',
        'app/services/booth/AddDJService',
        'app/services/booth/RemoveDJService',
        'app/services/booth/SkipDJService',
        'app/services/mutes/MuteUserService',
        'app/services/community/DeleteChatService',
        'app/services/staff/RemoveStaffService',
        'app/services/staff/UpdateStaffService'
    ],
    nameStart: 'app/commands/',
    name: {
        2: 'ModerateCommand'
    }
}, {
    nameLength: 3,
    modules: ['app/services/bans/RemoveBanService','app/models/UserModel'],
    strings: ['icon-ban'],
    nameStart: 'app/commands/',
    name: {
        2: 'UnbanCommand'
    }
}, {
    nameLength: 3,
    modules: ['app/views/dialogs/DialogPlaylistRename', 'app/views/dialogs/DialogPlaylistDelete'],
    nameStart: 'app/commands/',
    name: {
        2: 'PlaylistActionCommand'
    }
}, {
    nameLength: 3,
    modules: ['app/services/playlist/PlaylistSelectService'],
    nameStart: 'app/commands/',
    name: {
        2: 'PlaylistSyncCommand'
    }
}, {
    nameLength: 3,
    modules: ['app/services/playlist/PlaylistActivateService'],
    nameStart: 'app/commands/',
    name: {
        2: 'PlaylistActivateCommand'
    }
}, {
    nameLength: 3,
    modules: ['app/services/playlist/PlaylistCreateService'],
    nameStart: 'app/commands/',
    name: {
        2: 'PlaylistCreateCommand'
    }
}, {
    nameLength: 3,
    modules: ['app/services/playlist/PlaylistDeleteService'],
    nameStart: 'app/commands/',
    name: {
        2: 'PlaylistDeleteCommand'
    }
}, {
    nameLength: 3,
    modules: ['app/services/playlist/PlaylistRenameService'],
    nameStart: 'app/commands/',
    name: {
        2: 'PlaylistRenameCommand'
    }
}, {
    nameLength: 3,
    functions: ['fadeToMute'],
    nameStart: 'app/commands/',
    name: {
        2: 'PreviewCommand'
    }
}, {
    nameLength: 5,
    modules: ['hbs!templates/playlist/menu/PlaylistRow'],
    variables: {
        className: 'row'
    },
    nameStart: 'app/views/playlist/',
    name: {
        3: 'menu',
        4: 'PlaylistRowView'
    }
}, {
    nameLength: 5,
    modules: ['hbs!templates/playlist/menu/PlaylistMenu'],
    variables: {
        id: 'playlist-menu'
    },
    nameStart: 'app/views/playlist/menu/',
    name: {
        4: 'PlaylistMenuView'
    }
}, {
    nameLength: 6,
    modules: [
        'hbs!templates/playlist/media/actions/ActionsPlaylistMedia',
        'hbs!templates/playlist/media/actions/ActionsPlaylistMediaFirst',
        'hbs!templates/playlist/media/actions/ActionsPlaylistMediaLocked',
        'hbs!templates/playlist/media/actions/ActionsSearchMedia',
        'hbs!templates/playlist/media/actions/ActionsSearchPlaylists',
        'hbs!templates/playlist/media/actions/ActionsImportMedia',
        'hbs!templates/playlist/media/actions/ActionsHistory'
    ],
    nameStart: 'app/views/playlist/',
    name: {
        3: 'media',
        4: 'lists',
        5: 'MediaRowActionsView'
    }
}, {
    nameLength: 6,
    modules: ['app/views/playlist/menu/PlaylistMenuView'],
    nameStart: 'app/views/playlist/media/lists/',
    name: {
        5: 'AbstractMediaListView'
    }
}, {
    nameLength: 6,
    modules: ['app/views/playlist/media/lists/MediaRowActionsView'],
    nameStart: 'app/views/playlist/media/lists/',
    name: {
        5: 'AbstractMediaListRow'
    }
}, {
    nameLength: 6,
    modules: ['app/views/playlist/media/lists/AbstractMediaListRow', 'hbs!templates/playlist/media/list/PlaylistMediaRow'],
    variables: {
        className: 'row'
    },
    nameStart: 'app/views/playlist/media/lists/',
    name: {
        5: 'RestrictedSearchMediaListRow'
    }
}, {
    nameLength: 6,
    modules: ['app/views/playlist/media/lists/RestrictedSearchMediaListRow'],
    nameStart: 'app/views/playlist/media/lists/',
    name: {
        5: 'RestrictedSearchMediaListView'
    }
}, {
    nameLength: 4,
    variables: {
        id: 'dialog-restricted-media'
    },
    nameStart: 'app/views/dialogs/',
    name: {
        3: 'DialogRestrictedMedia'
    }
}, {
    nameLength: 3,
    modules: ['app/views/dialogs/DialogRestrictedMedia'],
    nameStart: 'app/commands/',
    name: {
        2: 'RestrictedSearchCommand'
    }
}, {
    nameLength: 3,
    modules: ['app/services/community/GetRoomsService'],
    strings: ['THIS_IS_A_FAVORITE_QUERY'],
    nameStart: 'app/facades/',
    name: {
        2: 'DashboardFacade'
    }
}, {
    nameLength: 5,
    modules: ['hbs!templates/room/popout/PopoutChat'],
    nameStart: 'app/views/room/',
    name: {
        3: 'popout',
        4: 'PopoutChatView'
    }
}, {
    nameLength: 5,
    modules: ['hbs!templates/room/popout/PopoutMeta'],
    nameStart: 'app/views/room/popout/',
    name: {
        4: 'PopoutMetaView'
    }
}, {
    nameLength: 4,
    modules: ['hbs!templates/room/Vote'],
    nameStart: 'app/views/room/',
    name: {
        3: 'VoteView'
    }
}, {
    nameLength: 5,
    modules: ['hbs!templates/room/Vote'],
    nameStart: 'app/views/room/popout/',
    name: {
        4: 'PopoutVoteView'
    }
}, {
    nameLength: 5,
    modules: ['app/views/room/popout/PopoutChatView', 'app/views/room/popout/PopoutMetaView', 'app/views/room/popout/PopoutVoteView'],
    nameStart: 'app/views/room/popout/',
    name: {
        4: 'PopoutView'
    }
}, {
    nameLength: 3,
    functions: ['actionAdd','actionDelete','actionMoveTo','actionPlayNext'],
    nameStart: 'app/commands/',
    name: {
        2: 'PlaylistCommand'
    }
}, {
    nameLength: 4,
    variables: {
        id: 'dialog-container'
    },
    nameStart: 'app/views/dialogs/',
    name: {
        3: 'DialogContainerView'
    }
}, {
    nameLength: 4,
    modules: ['hbs!templates/footer/FacebookMenu'],
    nameStart: 'app/views/',
    name: {
        2: 'footer',
        3: 'FacebookMenu'
    }
}, {
    nameLength: 4,
    modules: ['hbs!templates/footer/TwitterMenu'],
    nameStart: 'app/views/footer/',
    name: {
        3: 'TwitterMenu'
    }
}, {
    nameLength: 4,
    strings: ['YouTube Suggest Error'],
    nameStart: 'app/services/youtube/',
    name: {
        3: 'YouTubeSuggestService'
    }
}, {
    nameLength: 5,
    modules: ['app/services/youtube/YouTubeSuggestService'],
    nameStart: 'app/views/playlist/',
    name: {
        3: 'search',
        4: 'SearchSuggestionView'
    }
}, {
    nameLength: 5,
    modules: ['hbs!templates/playlist/search/Search'],
    nameStart: 'app/views/playlist/search/',
    name: {
        4: 'SearchView'
    }
}, {
    nameLength: 4,
    modules: ['app/views/playlist/search/SearchView'],
    variables: {
        id: 'playlist-panel'
    },
    nameStart: 'app/views/playlist/',
    name: {
        3: 'PlaylistPanelView'
    }
}, {
    nameLength: 4,
    modules: ['hbs!templates/footer/PlaylistMeta'],
    nameStart: 'app/views/footer/',
    name: {
        3: 'PlaylistMetaView'
    }
}, {
    nameLength: 4,
    modules: ['hbs!templates/footer/UserMeta'],
    nameStart: 'app/views/footer/',
    name: {
        3: 'UserMetaView'
    }
}, {
    nameLength: 4,
    variables: {
        id: 'footer'
    },
    modules: ['app/views/footer/PlaylistMetaView', 'app/views/footer/UserMetaView'],
    nameStart: 'app/views/footer/',
    name: {
        3: 'FooterView'
    }
}, {
    nameLength: 4,
    modules: ['hbs!templates/app/AppMenu'],
    nameStart: 'app/views/',
    name: {
        2: 'app',
        3: 'AppMenuView'
    }
}, {
    nameLength: 5,
    modules: ['hbs!templates/room/header/RoomBar'],
    nameStart: 'app/views/room/',
    name: {
        3: 'header',
        4: 'RoomBarView'
    }
}, {
    nameLength: 5,
    modules: ['hbs!templates/room/header/NowPlayingBar'],
    nameStart: 'app/views/room/header/',
    name: {
        4: 'NowPlayingBarView'
    }
}, {
    nameLength: 5,
    modules: ['app/views/room/header/RoomBarView', 'app/views/room/header/NowPlayingBarView'],
    nameStart: 'app/views/room/header/',
    name: {
        4: 'RoomMetaView'
    }
}, {
    nameLength: 5,
    modules: ['hbs!templates/room/header/PanelBar'],
    nameStart: 'app/views/room/header/',
    name: {
        4: 'PanelBarView'
    }
}, {
    nameLength: 5,
    modules: ['app/views/room/header/RoomMetaView', 'app/views/room/header/PanelBarView'],
    nameStart: 'app/views/room/header/',
    name: {
        4: 'HeaderView'
    }
}, {
    nameLength: 4,
    modules: ['app/services/booth/BoothLockService'],
    nameStart: 'app/views/dialogs/',
    name: {
        3: 'DialogBoothLock'
    }
}, {
    nameLength: 5,
    variables: {
        id: 'room-settings'
    },
    nameStart: 'app/views/room/',
    name: {
        3: 'settings',
        4: 'RoomInfoView'
    }
}, {
    nameLength: 4,
    modules: ['hbs!templates/dialogs/DialogRoomCreate'],
    nameStart: 'app/views/dialogs/',
    name: {
        3: 'DialogRoomCreate'
    }
}, {
    nameLength: 4,
    modules: ['hbs!templates/dashboard/Tutorial'],
    nameStart: 'app/views/',
    name: {
        2: 'dashboard',
        3: 'TutorialView'
    }
}, {
    nameLength: 4,
    modules: ['hbs!templates/dashboard/Search'],
    nameStart: 'app/views/dashboard/',
    name: {
        3: 'SearchView'
    }
}, {
    nameLength: 5,
    modules: ['hbs!templates/dashboard/GridCell'],
    nameStart: 'app/views/dashboard/',
    name: {
        3: 'grid',
        4: 'GridCellView'
    }
}, {
    nameLength: 5,
    modules: ['hbs!templates/dashboard/GridMenu'],
    nameStart: 'app/views/dashboard/grid/',
    name: {
        4: 'GridMenuView'
    }
}, {
    nameLength: 5,
    modules: ['hbs!templates/dashboard/News'],
    nameStart: 'app/views/dashboard/',
    name: {
        3: 'news',
        4: 'NewsView'
    }
}, {
    nameLength: 5,
    modules: ['hbs!templates/dashboard/NewsRow'],
    nameStart: 'app/views/dashboard/news/',
    name: {
        4: 'NewsRowView'
    }
}, {
    nameLength: 5,
    modules: ['hbs!templates/dashboard/EventCalendar'],
    nameStart: 'app/views/dashboard/',
    name: {
        3: 'events',
        4: 'EventCalendarView'
    }
}, {
    nameLength: 4,
    modules: ['hbs!templates/notifications/Notification'],
    nameStart: 'app/views/',
    name: {
        2: 'notifications',
        3: 'NotificationView'
    }
}, {
    nameLength: 4,
    modules: ['app/views/notifications/NotificationView'],
    nameStart: 'app/views/notifications/',
    name: {
        3: 'NotificationsView'
    }
}, {
    nameLength: 4,
    variables: {
        className: 'loading-box'
    },
    nameStart: 'app/views/room/',
    name: {
        3: 'RoomLoader'
    }
}, {
    nameLength: 4,
    modules: ['hbs!templates/room/Booth'],
    nameStart: 'app/views/room/',
    name: {
        3: 'BoothView'
    }
}, {
    nameLength: 4,
    modules: ['hbs!templates/room/DJButton'],
    nameStart: 'app/views/room/',
    name: {
        3: 'DJButtonView'
    }
}, {
    nameLength: 5,
    modules: ['hbs!templates/room/playback/Playback'],
    nameStart: 'app/views/room/',
    name: {
        3: 'playback',
        4: 'PlaybackView'
    }
}, {
    nameLength: 5,
    modules: ['hbs!templates/room/playback/Volume'],
    nameStart: 'app/views/room/playback/',
    name: {
        4: 'VolumeView'
    }
}, {
    nameLength: 4,
    modules: [
        'app/views/room/AudienceView',
        'app/views/room/BoothView',
        'app/views/room/DJButtonView',
        'app/views/room/header/HeaderView',
        'app/views/room/playback/PlaybackView',
        'app/views/room/RoomLoader'
    ],
    nameStart: 'app/views/room/',
    name: {
        3: 'RoomView'
    }
}, {
    nameLength: 4,
    modules: ['hbs!templates/footer/UserMenu'],
    nameStart: 'app/views/footer/',
    name: {
        3: 'UserMenuView'
    }
}, {
    nameLength: 3,

        moduleLength: 4,
    modules: ['app/models/UserModel'],
    variables: {
        comparator: 'uIndex'
    },
    nameStart: 'app/collections/',
    name: {
        2: 'UserCollection'
    }
}, {
    nameLength: 5,
    functions: ['remove', 'draw', 'drawRow'],
    modules: ['app/collections/UserCollection'],
    notModules: ['hbs!templates/room/user/FriendList'],
    nameStart: 'app/views/room/user/',
    name: {
        4: 'UserListView'
    }
}, {
    nameLength: 5,
    modules: ['app/views/room/user/BannedUserListRow', 'app/views/room/user/UserListView'],
    nameStart: 'app/views/room/user/',
    name: {
        4: 'BannedUserListView'
    }
}, {
    nameLength: 5,
    modules: ['hbs!templates/room/user/IgnoreRow'],
    nameStart: 'app/views/room/user/',
    name: {
        4: 'RoomIgnoreListRow'
    }
}, {
    nameLength: 5,
    modules: ['app/views/room/user/RoomIgnoreListRow', 'app/views/room/user/UserListView'],
    nameStart: 'app/views/room/user/',
    name: {
        4: 'RoomIgnoreListView'
    }
}, {
    nameLength: 5,
    modules: ['hbs!templates/room/user/MuteListRow'],
    nameStart: 'app/views/room/user/',
    name: {
        4: 'RoomMuteListRow'
    }
}, {
    nameLength: 5,
    modules: ['app/views/room/user/RoomMuteListRow', 'app/views/room/user/UserListView'],
    nameStart: 'app/views/room/user/',
    name: {
        4: 'RoomMuteListView'
    }
}, {
    nameLength: 5,
    modules: ['hbs!templates/room/user/RoomUserRow'],
    nameStart: 'app/views/room/user/',
    name: {
        4: 'RoomUserListRow'
    }
}, {
    nameLength: 5,
    modules: ['app/views/room/user/RoomUserListRow', 'app/views/room/user/UserListView'],
    nameStart: 'app/views/room/user/',
    name: {
        4: 'RoomUserListView'
    }
}, {
    nameLength: 5,
    modules: ['hbs!templates/room/user/WaitListRow'],
    nameStart: 'app/views/room/user/',
    name: {
        4: 'WaitListRow'
    }
}, {
    nameLength: 5,
    modules: ['hbs!templates/room/user/WaitList'],
    nameStart: 'app/views/room/user/',
    name: {
        4: 'WaitListView'
    }
}, {
    nameLength: 4,
    functions: ['showSimple'],
    nameStart: 'app/views/',
    name: {
        2: 'user',
        3: 'UserRolloverView'
    }
}, {
    nameLength: 4,
    variables: {
        id: 'tooltip'
    },
    modules: ['app/base/Context', 'app/store/Database'],
    nameStart: 'app/views/',
    name: {
        2: 'tooltips',
        3: 'TooltipView'
    }
}, {
    nameLength: 3,
    children: ['app/collections/PlaylistCollection'],
    variables: ['active','visible','syncing'],
    nameStart: 'app/models/',
    name: {
        2: 'PlaylistModel'
    }
}, {
    nameLength: 5,
    modules: ['hbs!templates/user/inventory/TabMenu'],
    nameStart: 'app/views/user/',
    name: {
        3: 'inventory',
        4: 'TabMenu'
    }
}, {
    nameLength: 5,
    modules: ['hbs!templates/user/inventory/AvatarCell'],
    nameStart: 'app/views/user/inventory/',
    name: {
        4: 'AvatarCell'
    }
}, {
    nameLength: 5,
    modules: ['hbs!templates/user/inventory/TransactionRow'],
    nameStart: 'app/views/user/inventory/',
    name: {
        4: 'TransactionRow'
    }
}, {
    nameLength: 5,
    modules: ['hbs!templates/user/inventory/TransactionHeader'],
    variables: {
        className: 'history'
    },
    nameStart: 'app/views/user/inventory/',
    name: {
        4: 'TransactionHistory'
    }
}, {
    nameLength: 5,
    modules: ['app/views/user/inventory/TabMenu','app/views/user/inventory/TransactionHistory'],
    variables: {
        id: 'user-inventory'
    },
    nameStart: 'app/views/user/inventory/',
    name: {
        4: 'UserInventory'
    }
}, {
    nameLength: 5,
    variables: {
        eventName: 'undefined'
    },
    functions: ['initialize'],
    nameStart: 'app/views/user/inventory/',
    name: {
        4: 'GenericPane'
    }
}, {
    nameLength: 5,
    modules: ['app/views/user/inventory/GenericPane'],
    variables: {
        className: 'avatars'
    },
    nameStart: 'app/views/user/inventory/',
    name: {
        4: 'AvatarsPane'
    }
}, {
    nameLength: 5,
    modules: ['app/views/user/inventory/GenericPane'],
    variables: {
        className: 'badges'
    },
    nameStart: 'app/views/user/inventory/',
    name: {
        4: 'BadgesPane'
    }
}];