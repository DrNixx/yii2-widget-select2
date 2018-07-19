<?php
namespace onix\assets;

/**
 * Asset bundle for the default inbuilt theme for [[Select2]] widget.
 */
class ThemeDefaultAsset extends AssetBundle
{
    /**
     * @inheritdoc
     */
    public function init()
    {
        $this->setSourcePath(__DIR__ . '../..//assets');
        $this->setupAssets('css', ['css/select2-default']);
        parent::init();
    }
}
